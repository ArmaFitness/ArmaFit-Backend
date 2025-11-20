import { WorkoutSessionsService } from './workout-sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { LogSetDto } from './dto/log-set.dto';
export declare class WorkoutSessionsController {
    private service;
    constructor(service: WorkoutSessionsService);
    createSession(req: any, dto: CreateSessionDto): Promise<import(".prisma/client").WorkoutSession>;
    logSet(req: any, sessionId: number, sessionExerciseId: number, dto: LogSetDto): Promise<import(".prisma/client").WorkoutSessionSet>;
    getSession(req: any, sessionId: number): Promise<import(".prisma/client").WorkoutSession & {
        sessionExercises: (import(".prisma/client").WorkoutSessionExercise & {
            exercise: import(".prisma/client").Exercise;
            sets: import(".prisma/client").WorkoutSessionSet[];
        })[];
    }>;
    getAllSessions(req: any): Promise<(import(".prisma/client").WorkoutSession & {
        plan: import(".prisma/client").WorkoutPlan;
    })[]>;
    getAthleteSessions(req: any, athleteId: number): Promise<(import(".prisma/client").WorkoutSession & {
        plan: import(".prisma/client").WorkoutPlan;
    })[]>;
    getAthleteSession(req: any, athleteId: number, sessionId: number): Promise<import(".prisma/client").WorkoutSession & {
        plan: import(".prisma/client").WorkoutPlan;
        sessionExercises: (import(".prisma/client").WorkoutSessionExercise & {
            exercise: import(".prisma/client").Exercise;
            sets: import(".prisma/client").WorkoutSessionSet[];
        })[];
    }>;
}
