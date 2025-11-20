import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { AddExercisesDto } from './dto/add-exercises.dto';
import { AddSetsDto } from './dto/add-sets.dto';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    createWorkout(req: any, dto: CreateWorkoutDto): Promise<import(".prisma/client").Workout>;
    addExercises(req: any, workoutId: number, dto: AddExercisesDto): Promise<any[]>;
    addSets(req: any, workoutId: number, workoutExerciseId: number, dto: AddSetsDto): Promise<import(".prisma/client").WorkoutSet[]>;
    getWorkout(req: any, workoutId: number): Promise<import(".prisma/client").Workout & {
        workoutExercises: (import(".prisma/client").WorkoutExercise & {
            exercise: import(".prisma/client").Exercise;
            sets: import(".prisma/client").WorkoutSet[];
        })[];
    }>;
}
