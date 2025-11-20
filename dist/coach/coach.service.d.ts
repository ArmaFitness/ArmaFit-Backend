import { PrismaService } from '../prisma/prisma.service';
import { AddAthleteDto } from './dto/add-athlete.dto';
export declare class CoachService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyAthletes(coachId: number): Promise<(import(".prisma/client").AthleteCoach & {
        athlete: {
            id: number;
            createdAt: Date;
            fullName: string;
            email: string;
        };
    })[]>;
    addAthlete(coachId: number, dto: AddAthleteDto): Promise<import(".prisma/client").AthleteCoach>;
    removeAthlete(coachId: number, athleteId: number): Promise<{
        ok: boolean;
    }>;
    getAthleteWeightLogs(coachId: number, athleteId: number): Promise<import(".prisma/client").Weight[]>;
}
