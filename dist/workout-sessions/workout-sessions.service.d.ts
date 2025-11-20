import { PrismaService } from '../prisma/prisma.service';
import { LogSetDto } from './dto/log-set.dto';
export declare class WorkoutSessionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(athleteId: number, planId: number): Promise<import(".prisma/client").WorkoutSession>;
    logSet(athleteId: number, sessionId: number, sessionExerciseId: number, dto: LogSetDto): Promise<import(".prisma/client").WorkoutSessionSet>;
    getSession(athleteId: number, sessionId: number): Promise<import(".prisma/client").WorkoutSession & {
        sessionExercises: (import(".prisma/client").WorkoutSessionExercise & {
            exercise: import(".prisma/client").Exercise;
            sets: import(".prisma/client").WorkoutSessionSet[];
        })[];
    }>;
    getAllSessions(athleteId: number): Promise<(import(".prisma/client").WorkoutSession & {
        plan: import(".prisma/client").WorkoutPlan;
    })[]>;
    assertCoachOfAthlete(coachId: number, athleteId: number): Promise<void>;
    getAthleteSessions(coachId: number, athleteId: number): Promise<(import(".prisma/client").WorkoutSession & {
        plan: import(".prisma/client").WorkoutPlan;
    })[]>;
    getAthleteSession(coachId: number, athleteId: number, sessionId: number): Promise<import(".prisma/client").WorkoutSession & {
        plan: import(".prisma/client").WorkoutPlan;
        sessionExercises: (import(".prisma/client").WorkoutSessionExercise & {
            exercise: import(".prisma/client").Exercise;
            sets: import(".prisma/client").WorkoutSessionSet[];
        })[];
    }>;
}
