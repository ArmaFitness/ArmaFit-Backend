import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WeightsService } from './weights.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';

@Controller('weights')
@UseGuards(JwtGuard, RolesGuard)
@Roles('athlete')
export class WeightsController {
  constructor(private readonly weightsService: WeightsService) {}

  // 1) Sportininkas įveda svorį
  @Post()
  addWeight(@Req() req, @Body() dto: CreateWeightDto) {
    const athleteId = req.user.id;
    return this.weightsService.addWeight(athleteId, dto);
  }

  // 2) Sportininkas gauna savo svorio istoriją
  @Get()
  getHistory(@Req() req) {
    const athleteId = req.user.id;
    return this.weightsService.getHistory(athleteId);
  }
}
