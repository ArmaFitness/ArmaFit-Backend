import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddAthleteDto } from './dto/add-athlete.dto';

@Injectable()
export class CoachService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all athletes of this coach
  async getMyAthletes(coachId: number) {
    return this.prisma.athleteCoach.findMany({
      where: { coachId },
      include: {
        athlete: {
          select: {
            id: true,
            fullName: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  // ✅ Add athlete to coach
  async addAthlete(coachId: number, dto: AddAthleteDto) {
    const athlete = await this.prisma.user.findUnique({
      where: { id: dto.athleteId },
    });

    if (!athlete) throw new NotFoundException('Athlete not found');
    if (athlete.role !== 'athlete') throw new ForbiddenException('User is not an athlete');

    // Check if already assigned
    const exists = await this.prisma.athleteCoach.findFirst({
      where: { coachId, athleteId: dto.athleteId },
    });

    if (exists) throw new HttpException('Athlete already added', 422);

    return this.prisma.athleteCoach.create({
      data: {
        coachId,
        athleteId: dto.athleteId,
      },
    });
  }

  // ✅ Remove athlete (optional)
  async removeAthlete(coachId: number, athleteId: number) {
    const link = await this.prisma.athleteCoach.findFirst({
      where: { coachId, athleteId },
    });

    if (!link) throw new NotFoundException('Athlete not assigned');

    await this.prisma.athleteCoach.delete({ where: { id: link.id } });

    return { ok: true };
  }

  async getAthleteWeightLogs(coachId: number, athleteId: number) {
    // ✅ Check coach-athlete relationship
    const rel = await this.prisma.athleteCoach.findFirst({
      where: { coachId, athleteId },
    });
  
    if (!rel) {
      throw new ForbiddenException('This athlete is not assigned to you.');
    }
  
    // ✅ Return weight logs
    return this.prisma.weight.findMany({
      where: { athleteId },
      orderBy: { date: 'asc' },
    });
  }
  
}
