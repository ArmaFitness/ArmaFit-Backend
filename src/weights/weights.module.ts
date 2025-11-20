import { Module } from '@nestjs/common';
import { WeightsController } from './weights.controller';
import { WeightsService } from './weights.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WeightsController],
  providers: [WeightsService, PrismaService],
})
export class WeightsModule {}
