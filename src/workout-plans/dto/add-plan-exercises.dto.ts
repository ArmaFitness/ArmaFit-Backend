import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PlanExerciseItem {
  @IsOptional()
  @IsInt()
  exerciseId?: number; // if using existing exercise

  @IsOptional()
  @IsString()
  name?: string; // if creating new exercise by name

  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

export class AddPlanExercisesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PlanExerciseItem)
  items: PlanExerciseItem[];
}
