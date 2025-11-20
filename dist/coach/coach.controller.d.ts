import { CoachService } from './coach.service';
import { AddAthleteDto } from './dto/add-athlete.dto';
export declare class CoachController {
    private service;
    constructor(service: CoachService);
    getMyAthletes(req: any): Promise<(import(".prisma/client").AthleteCoach & {
        athlete: {
            id: number;
            createdAt: Date;
            fullName: string;
            email: string;
        };
    })[]>;
    addAthlete(req: any, dto: AddAthleteDto): Promise<import(".prisma/client").AthleteCoach>;
    removeAthlete(req: any, athleteId: number): Promise<{
        ok: boolean;
    }>;
    getAthleteWeightLogs(req: any, athleteId: number): Promise<import(".prisma/client").Weight[]>;
}
