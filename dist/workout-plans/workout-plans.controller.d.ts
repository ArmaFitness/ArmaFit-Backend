import { WorkoutPlansService } from './workout-plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { AddPlanExercisesDto } from './dto/add-plan-exercises.dto';
import { AssignPlanDto } from './dto/assign-plan.dto';
import { ReorderPlanExercisesDto } from './dto/reorder-plan-exercises.dto';
export declare class WorkoutPlansController {
    private service;
    constructor(service: WorkoutPlansService);
    createPlan(req: any, dto: CreatePlanDto): Promise<import(".prisma/client").WorkoutPlan>;
    getPlan(req: any, planId: number): Promise<import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    }>;
    myPlansAsAthlete(req: any): Promise<(import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    })[]>;
    myPlansAsCoach(req: any): Promise<(import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    })[]>;
    addExercises(req: any, planId: number, dto: AddPlanExercisesDto): Promise<import(".prisma/client").WorkoutPlan & {
        exercises: (import(".prisma/client").WorkoutPlanExercise & {
            exercise: import(".prisma/client").Exercise;
        })[];
    }>;
    reorderExercises(req: any, planId: number, dto: ReorderPlanExercisesDto): Promise<{
        ok: boolean;
    }>;
    removePlanExercise(req: any, planExerciseId: number): Promise<{
        ok: boolean;
    }>;
    assign(req: any, planId: number, dto: AssignPlanDto): Promise<import(".prisma/client").WorkoutPlan>;
}
