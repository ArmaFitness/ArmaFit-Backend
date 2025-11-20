import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightDto } from './dto/create-weight.dto';

@Injectable()
export class WeightsService {
  constructor(private prisma: PrismaService) {}

  async addWeight(athleteId: number, dto: CreateWeightDto) {
    
    const weight = typeof dto.weightKg === 'string' ? parseFloat(dto.weightKg) : dto.weightKg;
  
    if (typeof weight !== 'number' || isNaN(weight)) {
      throw new BadRequestException('Weight must be a positive number');
    }
  
    if (weight <= 0) {
      throw new HttpException('Weight must be greater than 0', 422);
  }

    return this.prisma.weight.create({
      data: {
        athleteId,
        weightKg: weight,
        date: new Date(dto.date),
      },
    });
  }

  async getHistory(athleteId: number) {
    return this.prisma.weight.findMany({
      where: { athleteId },
      orderBy: { date: 'asc' },
    });
  }
}
