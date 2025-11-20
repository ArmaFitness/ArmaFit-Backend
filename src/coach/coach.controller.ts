import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { CoachService } from './coach.service';
  import { JwtGuard, RolesGuard } from '../auth/guard';
  import { Roles } from '../auth/decorator';
  import { AddAthleteDto } from './dto/add-athlete.dto';
  
  @Controller('coach')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('coach')
  export class CoachController {
    constructor(private service: CoachService) {}
  
    // ✅ Get all athletes assigned to this coach
    @Get('athletes')
    getMyAthletes(@Req() req) {
      return this.service.getMyAthletes(req.user.id);
    }
  
    // ✅ Add an athlete
    @Post('athletes')
    addAthlete(@Req() req, @Body() dto: AddAthleteDto) {
      return this.service.addAthlete(req.user.id, dto);
    }
  
    // ✅ Remove athlete 
    @Delete('athletes/:athleteId')
    removeAthlete(
      @Req() req,
      @Param('athleteId', ParseIntPipe) athleteId: number,
    ) {
      return this.service.removeAthlete(req.user.id, athleteId);
    }

    @Get('athletes/:athleteId/weights')
    getAthleteWeightLogs(
    @Req() req,
    @Param('athleteId', ParseIntPipe) athleteId: number,
    ) {
        return this.service.getAthleteWeightLogs(req.user.id, athleteId);
    }

  }
  