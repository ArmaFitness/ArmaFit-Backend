import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { WorkoutPlansService } from './workout-plans.service';
  import { CreatePlanDto } from './dto/create-plan.dto';
  import { AddPlanExercisesDto } from './dto/add-plan-exercises.dto';
  import { AssignPlanDto } from './dto/assign-plan.dto';
  import { ReorderPlanExercisesDto } from './dto/reorder-plan-exercises.dto';
  import { JwtGuard, RolesGuard } from '../auth/guard';
  import { Roles } from '../auth/decorator';
  
  @Controller('plans')
  @UseGuards(JwtGuard, RolesGuard)
  export class WorkoutPlansController {
    constructor(private service: WorkoutPlansService) {}
  
    // Athlete or Coach can create a plan
    @Post()
    @Roles('athlete', 'coach')
    createPlan(@Req() req, @Body() dto: CreatePlanDto) {
      return this.service.createPlan(req.user.id, dto);
    }
  
    // Get a single plan with its exercises (creator or assigned athlete)
    @Get(':planId')
    @Roles('athlete', 'coach')
    getPlan(@Req() req, @Param('planId', ParseIntPipe) planId: number) {
      return this.service.getPlan(req.user.id, planId);
    }
  
    // Athlete sees his assigned plans
    @Get('me/athlete')
    @Roles('athlete')
    myPlansAsAthlete(@Req() req) {
      return this.service.myPlansAsAthlete(req.user.id);
    }
  
    // Coach sees plans they created
    @Get('me/coach')
    @Roles('coach')
    myPlansAsCoach(@Req() req) {
      return this.service.myPlansAsCoach(req.user.id);
    }
  
    // Add exercises to plan (creator or assigned athlete can manage)
    @Post(':planId/exercises')
    @Roles('athlete', 'coach')
    addExercises(
      @Req() req,
      @Param('planId', ParseIntPipe) planId: number,
      @Body() dto: AddPlanExercisesDto,
    ) {
      return this.service.addExercises(req.user.id, planId, dto);
    }
  
    // Reorder plan exercises
    @Patch(':planId/exercises/reorder')
    @Roles('athlete', 'coach')
    reorderExercises(
      @Req() req,
      @Param('planId', ParseIntPipe) planId: number,
      @Body() dto: ReorderPlanExercisesDto,
    ) {
      return this.service.reorderExercises(req.user.id, planId, dto);
    }
  
    // Remove a plan exercise by id
    @Delete('exercise/:planExerciseId')
    @Roles('athlete', 'coach')
    removePlanExercise(
      @Req() req,
      @Param('planExerciseId', ParseIntPipe) planExerciseId: number,
    ) {
      return this.service.removePlanExercise(req.user.id, planExerciseId);
    }
  
    // Coach assigns a plan to an athlete (must be in roster)
    @Post(':planId/assign')
    @Roles('coach')
    assign(
      @Req() req,
      @Param('planId', ParseIntPipe) planId: number,
      @Body() dto: AssignPlanDto,
    ) {
      return this.service.assignPlanToAthlete(req.user.id, planId, dto);
    }
  }
  