import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogSetDto } from './dto/log-set.dto';

@Injectable()
export class WorkoutSessionsService {
  constructor(private prisma: PrismaService) {}

  async createSession(athleteId: number, planId: number) {
    const plan = await this.prisma.workoutPlan.findUnique({
      where: { id: planId },
      include: { exercises: true },
    });

    if (!plan) throw new NotFoundException('Workout plan not found');
    if (plan.assignedToId !== athleteId && plan.creatorId !== athleteId)
      throw new ForbiddenException('You are not allowed to use this plan');

    const session = await this.prisma.workoutSession.create({
      data: {
        athleteId,
        planId,
      },
    });

    // Copy template exercises to session
    await this.prisma.$transaction(
      plan.exercises.map((ex) =>
        this.prisma.workoutSessionExercise.create({
          data: {
            sessionId: session.id,
            exerciseId: ex.exerciseId,
            orderIndex: ex.orderIndex,
          },
        }),
      ),
    );

    return session;
  }

  async logSet(athleteId: number, sessionId: number, sessionExerciseId: number, dto: LogSetDto) {
    const session = await this.prisma.workoutSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) throw new NotFoundException('Session not found');
    if (session.athleteId !== athleteId)
      throw new ForbiddenException('This is not your session');

    if (dto.rpe < 0 || dto.rpe > 10) {
      throw new HttpException('RPE cannot exceed 10 and be lower than 0', 422);
    }

    if (dto.reps <= 0) {
      throw new HttpException('Reps must be positive', 422);
    }

    if (dto.weightKg < 0) {
      throw new HttpException('Weight must be positive', 422);
    }


    return this.prisma.workoutSessionSet.upsert({
      where: {
        sessionExerciseId_setIndex: {
          sessionExerciseId,
          setIndex: dto.setIndex,
        },
      },
      update: {
        reps: dto.reps,
        weightKg: dto.weightKg,
        rpe: dto.rpe,
        notes: dto.notes,
      },
      create: {
        sessionExerciseId,
        setIndex: dto.setIndex,
        reps: dto.reps,
        weightKg: dto.weightKg,
        rpe: dto.rpe,
        notes: dto.notes,
      },
    });
  }

  async getSession(athleteId: number, sessionId: number) {
    return this.prisma.workoutSession.findFirst({
      where: { id: sessionId, athleteId },
      include: {
        sessionExercises: {
          include: {
            exercise: true,
            sets: { orderBy: { setIndex: 'asc' } },
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async getAllSessions(athleteId: number) {
    return this.prisma.workoutSession.findMany({
      where: { athleteId },
      orderBy: { date: 'desc' },
      include: { plan: true },
    });
  }

  async assertCoachOfAthlete(coachId: number, athleteId: number) {
    const rel = await this.prisma.athleteCoach.findFirst({
      where: { coachId, athleteId },
    });
    if (!rel) throw new ForbiddenException("This athlete is not your client");
  }
  
  async getAthleteSessions(coachId: number, athleteId: number) {
    await this.assertCoachOfAthlete(coachId, athleteId);
  
    return this.prisma.workoutSession.findMany({
      where: { athleteId },
      orderBy: { date: 'desc' },
      include: {
        plan: true,
      },
    });
  }

  async getAthleteSession(coachId: number, athleteId: number, sessionId: number) {
    await this.assertCoachOfAthlete(coachId, athleteId);
  
    return this.prisma.workoutSession.findFirst({
      where: { id: sessionId, athleteId },
      include: {
        sessionExercises: {
          include: {
            exercise: true,
            sets: { orderBy: { setIndex: 'asc' } },
          },
          orderBy: { orderIndex: 'asc' },
        },
        plan: true,
      },
    });
  }
  
  
}
