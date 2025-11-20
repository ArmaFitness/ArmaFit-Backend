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
exports.WorkoutSessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkoutSessionsService = class WorkoutSessionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(athleteId, planId) {
        const plan = await this.prisma.workoutPlan.findUnique({
            where: { id: planId },
            include: { exercises: true },
        });
        if (!plan)
            throw new common_1.NotFoundException('Workout plan not found');
        if (plan.assignedToId !== athleteId && plan.creatorId !== athleteId)
            throw new common_1.ForbiddenException('You are not allowed to use this plan');
        const session = await this.prisma.workoutSession.create({
            data: {
                athleteId,
                planId,
            },
        });
        await this.prisma.$transaction(plan.exercises.map((ex) => this.prisma.workoutSessionExercise.create({
            data: {
                sessionId: session.id,
                exerciseId: ex.exerciseId,
                orderIndex: ex.orderIndex,
            },
        })));
        return session;
    }
    async logSet(athleteId, sessionId, sessionExerciseId, dto) {
        const session = await this.prisma.workoutSession.findUnique({
            where: { id: sessionId },
        });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        if (session.athleteId !== athleteId)
            throw new common_1.ForbiddenException('This is not your session');
        if (dto.rpe < 0 || dto.rpe > 10) {
            throw new common_1.HttpException('RPE cannot exceed 10 and be lower than 0', 422);
        }
        if (dto.reps <= 0) {
            throw new common_1.HttpException('Reps must be positive', 422);
        }
        if (dto.weightKg < 0) {
            throw new common_1.HttpException('Weight must be positive', 422);
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
    async getSession(athleteId, sessionId) {
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
    async getAllSessions(athleteId) {
        return this.prisma.workoutSession.findMany({
            where: { athleteId },
            orderBy: { date: 'desc' },
            include: { plan: true },
        });
    }
    async assertCoachOfAthlete(coachId, athleteId) {
        const rel = await this.prisma.athleteCoach.findFirst({
            where: { coachId, athleteId },
        });
        if (!rel)
            throw new common_1.ForbiddenException("This athlete is not your client");
    }
    async getAthleteSessions(coachId, athleteId) {
        await this.assertCoachOfAthlete(coachId, athleteId);
        return this.prisma.workoutSession.findMany({
            where: { athleteId },
            orderBy: { date: 'desc' },
            include: {
                plan: true,
            },
        });
    }
    async getAthleteSession(coachId, athleteId, sessionId) {
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
};
WorkoutSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutSessionsService);
exports.WorkoutSessionsService = WorkoutSessionsService;
//# sourceMappingURL=workout-sessions.service.js.map