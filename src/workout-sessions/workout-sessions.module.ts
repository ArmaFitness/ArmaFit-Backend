import { Module } from '@nestjs/common';
import { WorkoutSessionsController } from './workout-sessions.controller';
import { WorkoutSessionsService } from './workout-sessions.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WorkoutSessionsController],
  providers: [WorkoutSessionsService, PrismaService],
})
export class WorkoutSessionsModule {}
