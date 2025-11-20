import { WeightsService } from './weights.service';
import { CreateWeightDto } from './dto/create-weight.dto';
export declare class WeightsController {
    private readonly weightsService;
    constructor(weightsService: WeightsService);
    addWeight(req: any, dto: CreateWeightDto): Promise<import(".prisma/client").Weight>;
    getHistory(req: any): Promise<import(".prisma/client").Weight[]>;
}
