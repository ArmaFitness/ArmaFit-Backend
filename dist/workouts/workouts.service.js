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
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkoutsService = class WorkoutsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertWorkoutOwner(athleteId, workoutId) {
        const workout = await this.prisma.workout.findUnique({ where: { id: workoutId } });
        if (!workout)
            throw new common_1.NotFoundException('Workout not found');
        if (workout.athleteId !== athleteId)
            throw new common_1.ForbiddenException('Not your workout');
        return workout;
    }
    async createWorkout(athleteId, dto) {
        return this.prisma.workout.create({
            data: {
                athleteId,
                date: new Date(Date.now()),
                durationMinutes: dto.durationMinutes,
                notes: dto.notes,
            },
        });
    }
    async addExercises(athleteId, workoutId, dto) {
        var _a;
        await this.assertWorkoutOwner(athleteId, workoutId);
        const ops = [];
        for (const item of dto.items) {
            let exerciseId = item.exerciseId;
            if (!exerciseId) {
                if (!item.name)
                    throw new common_1.NotFoundException('exerciseId or name is required');
                const existing = await this.prisma.exercise.findUnique({ where: { name: item.name } });
                const exercise = existing !== null && existing !== void 0 ? existing : await this.prisma.exercise.create({
                    data: { name: item.name },
                });
                exerciseId = exercise.id;
            }
            ops.push(this.prisma.workoutExercise.create({
                data: {
                    workoutId,
                    exerciseId,
                    orderIndex: (_a = item.orderIndex) !== null && _a !== void 0 ? _a : 0,
                    notes: item.notes,
                },
            }));
        }
        return this.prisma.$transaction(ops);
    }
    async addSets(athleteId, workoutId, workoutExerciseId, dto) {
        await this.assertWorkoutOwner(athleteId, workoutId);
        const we = await this.prisma.workoutExercise.findUnique({ where: { id: workoutExerciseId } });
        if (!we || we.workoutId !== workoutId)
            throw new common_1.NotFoundException('WorkoutExercise not found');
        const ops = dto.sets.map(set => this.prisma.workoutSet.upsert({
            where: {
                workoutExerciseId_setIndex: { workoutExerciseId, setIndex: set.setIndex },
            },
            update: {
                reps: set.reps,
                weightKg: set.weightKg,
                rpe: set.rpe,
                notes: set.notes,
            },
            create: {
                workoutExerciseId,
                setIndex: set.setIndex,
                reps: set.reps,
                weightKg: set.weightKg,
                rpe: set.rpe,
                notes: set.notes,
            },
        }));
        await this.prisma.$transaction(ops);
        return this.prisma.workoutSet.findMany({
            where: { workoutExerciseId },
            orderBy: { setIndex: 'asc' },
        });
    }
    async getWorkout(athleteId, workoutId) {
        await this.assertWorkoutOwner(athleteId, workoutId);
        return this.prisma.workout.findUnique({
            where: { id: workoutId },
            include: {
                workoutExercises: {
                    include: {
                        exercise: true,
                        sets: { orderBy: { setIndex: 'asc' } },
                    },
                    orderBy: { orderIndex: 'asc' },
                },
            },
        });
    }
};
WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutsService);
exports.WorkoutsService = WorkoutsService;
//# sourceMappingURL=workouts.service.js.map