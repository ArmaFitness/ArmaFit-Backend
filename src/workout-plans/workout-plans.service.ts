import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { AddPlanExercisesDto } from './dto/add-plan-exercises.dto';
import { AssignPlanDto } from './dto/assign-plan.dto';
import { ReorderPlanExercisesDto } from './dto/reorder-plan-exercises.dto';

@Injectable()
export class WorkoutPlansService {
  constructor(private prisma: PrismaService) {}

  async createPlan(userId: number, dto: CreatePlanDto) {
    return this.prisma.workoutPlan.create({
      data: {
        title: dto.title,
        description: dto.description,
        creatorId: userId,
      },
    });
  }

  async getPlan(userId: number, planId: number) {
    // allow creator or assigned athlete to view
    const plan = await this.prisma.workoutPlan.findUnique({
      where: { id: planId },
      include: {
        exercises: {
          include: { exercise: true },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
    if (!plan) throw new NotFoundException('Plan not found');

    const allowed = plan.creatorId === userId || plan.assignedToId === userId;
    if (!allowed) throw new ForbiddenException();

    return plan;
  }

  async myPlansAsAthlete(athleteId: number) {
    return this.prisma.workoutPlan.findMany({
      where: { creatorId: athleteId },
      orderBy: { createdAt: 'desc' },
      include: { exercises: { include: { exercise: true }, orderBy: { orderIndex: 'asc' } } },
    });
  }

  async myPlansAsCoach(coachId: number) {
    return this.prisma.workoutPlan.findMany({
      where: { creatorId: coachId },
      orderBy: { createdAt: 'desc' },
      include: { exercises: { include: { exercise: true }, orderBy: { orderIndex: 'asc' } } },
    });
  }

  async addExercises(userId: number, planId: number, dto: AddPlanExercisesDto) {
    const plan = await this.prisma.workoutPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Plan not found');
    if (plan.creatorId !== userId && plan.assignedToId !== userId)
      throw new ForbiddenException('Not allowed to modify this plan');

    const ops = [];
    for (const item of dto.items) {
      let exerciseId = item.exerciseId;
      if (!exerciseId) {
        if (!item.name) throw new NotFoundException('exerciseId or name is required');
        const existing = await this.prisma.exercise.findUnique({ where: { name: item.name } });
        const ex = existing ?? await this.prisma.exercise.create({ data: { name: item.name } });
        exerciseId = ex.id;
      }

      ops.push(
        this.prisma.workoutPlanExercise.create({
          data: {
            planId,
            exerciseId,
            orderIndex: item.orderIndex ?? 0,
          },
        }),
      );
    }

    await this.prisma.$transaction(ops);

    return this.prisma.workoutPlan.findUnique({
      where: { id: planId },
      include: {
        exercises: { include: { exercise: true }, orderBy: { orderIndex: 'asc' } },
      },
    });
  }

  async reorderExercises(userId: number, planId: number, dto: ReorderPlanExercisesDto) {
    const plan = await this.prisma.workoutPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Plan not found');
    if (plan.creatorId !== userId && plan.assignedToId !== userId)
      throw new ForbiddenException();

    await this.prisma.$transaction(
      dto.order.map((o) =>
        this.prisma.workoutPlanExercise.update({
          where: { id: o.planExerciseId },
          data: { orderIndex: o.orderIndex },
        }),
      ),
    );

    return { ok: true };
  }

  async removePlanExercise(userId: number, planExerciseId: number) {
    const pe = await this.prisma.workoutPlanExercise.findUnique({
      where: { id: planExerciseId },
      include: { plan: true },
    });
    if (!pe) throw new NotFoundException('Plan exercise not found');
    if (pe.plan.creatorId !== userId && pe.plan.assignedToId !== userId)
      throw new ForbiddenException();

    await this.prisma.workoutPlanExercise.delete({ where: { id: planExerciseId } });
    return { ok: true };
  }

  // Coach-only: assign plan to athlete (checks relationship)
  async assignPlanToAthlete(coachId: number, planId: number, dto: AssignPlanDto) {
    const plan = await this.prisma.workoutPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Plan not found');

    // only the creator coach can assign
    if (plan.creatorId !== coachId) throw new ForbiddenException('Only creator coach can assign');

    // verify coach-athlete relation exists
    const rel = await this.prisma.athleteCoach.findFirst({
      where: { coachId, athleteId: dto.athleteId },
    });
    if (!rel) throw new ForbiddenException('This athlete is not in your roster');

    if (plan.assignedToId === dto.athleteId) {
      throw new HttpException('This plan is already assigned to this athlete', 422);
    }

    return this.prisma.workoutPlan.update({
      where: { id: planId },
      data: { assignedToId: dto.athleteId },
    });
  }
}
