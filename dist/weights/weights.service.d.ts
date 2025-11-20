import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightDto } from './dto/create-weight.dto';
export declare class WeightsService {
    private prisma;
    constructor(prisma: PrismaService);
    addWeight(athleteId: number, dto: CreateWeightDto): Promise<import(".prisma/client").Weight>;
    getHistory(athleteId: number): Promise<import(".prisma/client").Weight[]>;
}
