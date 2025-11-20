declare class ExerciseItem {
    exerciseId?: number;
    name?: string;
    notes?: string;
    orderIndex?: number;
}
export declare class AddExercisesDto {
    items: ExerciseItem[];
}
export {};
