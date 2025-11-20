import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { AddPlanExercisesDto } from './dto/add-plan-exercises.dto';
import { AssignPlanDto } from './dto/assign-plan.dto';
import { ReorderPlanExercisesDto } from './dto/reorder-plan-exercises.dto';
export declare class WorkoutPlansService {
    private prisma;
    constructor(prisma: PrismaService);
    createPlan(userId: number, dto: CreatePlanDto): Promise<import(".prisma/client").WorkoutPlan>;
    getPlan(userId: number, planId: number): Promise<import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    }>;
    myPlansAsAthlete(athleteId: number): Promise<(import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    })[]>;
    myPlansAsCoach(coachId: number): Promise<(import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    })[]>;
    addExercises(userId: number, planId: number, dto: AddPlanExercisesDto): Promise<import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    }>;
    reorderExercises(userId: number, planId: number, dto: ReorderPlanExercisesDto): Promise<{
        ok: boolean;
    }>;
    removePlanExercise(userId: number, planExerciseId: number): Promise<{
        ok: boolean;
    }>;
    assignPlanToAthlete(coachId: number, planId: number, dto: AssignPlanDto): Promise<import(".prisma/client").WorkoutPlan>;
}
