import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class LogSetDto {
  @IsInt()
  @Min(1)
  setIndex: number;

  @IsInt()
  reps: number;

  @IsNumber()
  weightKg: number;

  @IsOptional()
  @IsNumber()
  rpe?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
