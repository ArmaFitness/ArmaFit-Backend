import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { AddExercisesDto } from './dto/add-exercises.dto';
import { AddSetsDto } from './dto/add-sets.dto';
export declare class WorkoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    private assertWorkoutOwner;
    createWorkout(athleteId: number, dto: CreateWorkoutDto): Promise<import(".prisma/client").Workout>;
    addExercises(athleteId: number, workoutId: number, dto: AddExercisesDto): Promise<any[]>;
    addSets(athleteId: number, workoutId: number, workoutExerciseId: number, dto: AddSetsDto): Promise<import(".prisma/client").WorkoutSet[]>;
    getWorkout(athleteId: number, workoutId: number): Promise<import(".prisma/client").Workout & {
        workoutExercises: (import(".prisma/client").WorkoutExercise & {
            exercise: import(".prisma/client").Exercise;
            sets: import(".prisma/client").WorkoutSet[];
        })[];
    }>;
}
