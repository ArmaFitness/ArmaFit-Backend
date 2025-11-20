import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { WorkoutSessionsService } from './workout-sessions.service';
  import { CreateSessionDto } from './dto/create-session.dto';
  import { LogSetDto } from './dto/log-set.dto';
  import { JwtGuard, RolesGuard } from '../auth/guard';
  import { Roles } from '../auth/decorator/roles.decorator';
  
  @Controller('sessions')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('athlete')
  export class WorkoutSessionsController {
    constructor(private service: WorkoutSessionsService) {}
  
    // 1. Create session (copy exercises from plan)
    @Post()
    createSession(@Req() req, @Body() dto: CreateSessionDto) {
      return this.service.createSession(req.user.id, dto.planId);
    }
  
    // 2. Log sets for a session exercise
    @Post(':sessionId/exercises/:sessionExerciseId/sets')
    logSet(
      @Req() req,
      @Param('sessionId', ParseIntPipe) sessionId: number,
      @Param('sessionExerciseId', ParseIntPipe) sessionExerciseId: number,
      @Body() dto: LogSetDto,
    ) {
      return this.service.logSet(req.user.id, sessionId, sessionExerciseId, dto);
    }
  
    // 3. View a full logged session
    @Get(':sessionId')
    getSession(
      @Req() req,
      @Param('sessionId', ParseIntPipe) sessionId: number,
    ) {
      return this.service.getSession(req.user.id, sessionId);
    }
  
    // 4. Get history of all sessions
    @Get()
    getAllSessions(@Req() req) {
      return this.service.getAllSessions(req.user.id);
    }

    @Get('athlete/:athleteId')
    @Roles('coach')
    getAthleteSessions(
    @Req() req,
    @Param('athleteId', ParseIntPipe) athleteId: number,
    ){
        return this.service.getAthleteSessions(req.user.id, athleteId);
    }

    @Get('athlete/:athleteId/session/:sessionId')
    @Roles('coach')
    getAthleteSession(
    @Req() req,
    @Param('athleteId', ParseIntPipe) athleteId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
    ) {
        return this.service.getAthleteSession(req.user.id, athleteId, sessionId);
    }


  }
  