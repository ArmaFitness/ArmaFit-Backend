"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutPlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkoutPlansService = class WorkoutPlansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlan(userId, dto) {
        return this.prisma.workoutPlan.create({
            data: {
                title: dto.title,
                description: dto.description,
                creatorId: userId,
            },
        });
    }
    async getPlan(userId, planId) {
        const plan = await this.prisma.workoutPlan.findUnique({
            where: { id: planId },
            include: {
                exercises: {
                    include: { exercise: true },
                    orderBy: { orderIndex: 'asc' },
                },
            },
        });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        const allowed = plan.creatorId === userId || plan.assignedToId === userId;
        if (!allowed)
            throw new common_1.ForbiddenException();
        return plan;
    }
    async myPlansAsAthlete(athleteId) {
        return this.prisma.workoutPlan.findMany({
            where: { assignedToId: athleteId },
            orderBy: { createdAt: 'desc' },
            include: { exercises: { include: { exercise: true }, orderBy: { orderIndex: 'asc' } } },
        });
    }
    async myPlansAsCoach(coachId) {
        return this.prisma.workoutPlan.findMany({
            where: { creatorId: coachId },
            orderBy: { createdAt: 'desc' },
            include: { exercises: { include: { exercise: true }, orderBy: { orderIndex: 'asc' } } },
        });
    }
    async addExercises(userId, planId, dto) {
        var _a;
        const plan = await this.prisma.workoutPlan.findUnique({ where: { id: planId } });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        if (plan.creatorId !== userId && plan.assignedToId !== userId)
            throw new common_1.ForbiddenException('Not allowed to modify this plan');
        const ops = [];
        for (const item of dto.items) {
            let exerciseId = item.exerciseId;
            if (!exerciseId) {
                if (!item.name)
                    throw new common_1.NotFoundException('exerciseId or name is required');
                const existing = await this.prisma.exercise.findUnique({ where: { name: item.name } });
                const ex = existing !== null && existing !== void 0 ? existing : await this.prisma.exercise.create({ data: { name: item.name } });
                exerciseId = ex.id;
            }
            ops.push(this.prisma.workoutPlanExercise.create({
                data: {
                    planId,
                    exerciseId,
                    orderIndex: (_a = item.orderIndex) !== null && _a !== void 0 ? _a : 0,
                },
            }));
        }
        await this.prisma.$transaction(ops);
        return this.prisma.workoutPlan.findUnique({
            where: { id: planId },
            include: {
                exercises: { include: { exercise: true }, orderBy: { orderIndex: 'asc' } },
            },
        });
    }
    async reorderExercises(userId, planId, dto) {
        const plan = await this.prisma.workoutPlan.findUnique({ where: { id: planId } });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        if (plan.creatorId !== userId && plan.assignedToId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.$transaction(dto.order.map((o) => this.prisma.workoutPlanExercise.update({
            where: { id: o.planExerciseId },
            data: { orderIndex: o.orderIndex },
        })));
        return { ok: true };
    }
    async removePlanExercise(userId, planExerciseId) {
        const pe = await this.prisma.workoutPlanExercise.findUnique({
            where: { id: planExerciseId },
            include: { plan: true },
        });
        if (!pe)
            throw new common_1.NotFoundException('Plan exercise not found');
        if (pe.plan.creatorId !== userId && pe.plan.assignedToId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.workoutPlanExercise.delete({ where: { id: planExerciseId } });
        return { ok: true };
    }
    async assignPlanToAthlete(coachId, planId, dto) {
        const plan = await this.prisma.workoutPlan.findUnique({ where: { id: planId } });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        if (plan.creatorId !== coachId)
            throw new common_1.ForbiddenException('Only creator coach can assign');
        const rel = await this.prisma.athleteCoach.findFirst({
            where: { coachId, athleteId: dto.athleteId },
        });
        if (!rel)
            throw new common_1.ForbiddenException('This athlete is not in your roster');
        if (plan.assignedToId === dto.athleteId) {
            throw new common_1.HttpException('This plan is already assigned to this athlete', 422);
        }
        return this.prisma.workoutPlan.update({
            where: { id: planId },
            data: { assignedToId: dto.athleteId },
        });
    }
};
WorkoutPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutPlansService);
exports.WorkoutPlansService = WorkoutPlansService;
//# sourceMappingURL=workout-plans.service.js.map