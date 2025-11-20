"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoachService = class CoachService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyAthletes(coachId) {
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
    async addAthlete(coachId, dto) {
        const athlete = await this.prisma.user.findUnique({
            where: { id: dto.athleteId },
        });
        if (!athlete)
            throw new common_1.NotFoundException('Athlete not found');
        if (athlete.role !== 'athlete')
            throw new common_1.ForbiddenException('User is not an athlete');
        const exists = await this.prisma.athleteCoach.findFirst({
            where: { coachId, athleteId: dto.athleteId },
        });
        if (exists)
            throw new common_1.HttpException('Athlete already added', 422);
        return this.prisma.athleteCoach.create({
            data: {
                coachId,
                athleteId: dto.athleteId,
            },
        });
    }
    async removeAthlete(coachId, athleteId) {
        const link = await this.prisma.athleteCoach.findFirst({
            where: { coachId, athleteId },
        });
        if (!link)
            throw new common_1.NotFoundException('Athlete not assigned');
        await this.prisma.athleteCoach.delete({ where: { id: link.id } });
        return { ok: true };
    }
    async getAthleteWeightLogs(coachId, athleteId) {
        const rel = await this.prisma.athleteCoach.findFirst({
            where: { coachId, athleteId },
        });
        if (!rel) {
            throw new common_1.ForbiddenException('This athlete is not assigned to you.');
        }
        return this.prisma.weight.findMany({
            where: { athleteId },
            orderBy: { date: 'asc' },
        });
    }
};
CoachService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoachService);
exports.CoachService = CoachService;
//# sourceMappingURL=coach.service.js.map