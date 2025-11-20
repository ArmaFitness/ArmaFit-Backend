import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { WeightsModule } from './weights/weights.module';
import { MessagesModule } from './messages/messages.module';
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module';
import { CoachModule } from './coach/coach.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), 
    AuthModule, 
    UserModule, 
    BookmarkModule, 
    PrismaModule, 
    WorkoutSessionsModule, 
    WeightsModule, 
    MessagesModule, 
    WorkoutPlansModule,
    CoachModule],
})
export class AppModule {}
