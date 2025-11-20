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
exports.WeightsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WeightsService = class WeightsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addWeight(athleteId, dto) {
        const weight = typeof dto.weightKg === 'string' ? parseFloat(dto.weightKg) : dto.weightKg;
        if (typeof weight !== 'number' || isNaN(weight)) {
            throw new common_1.BadRequestException('Weight must be a positive number');
        }
        if (weight <= 0) {
            throw new common_1.HttpException('Weight must be greater than 0', 422);
        }
        return this.prisma.weight.create({
            data: {
                athleteId,
                weightKg: weight,
                date: new Date(dto.date),
            },
        });
    }
    async getHistory(athleteId) {
        return this.prisma.weight.findMany({
            where: { athleteId },
            orderBy: { date: 'asc' },
        });
    }
};
WeightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WeightsService);
exports.WeightsService = WeightsService;
//# sourceMappingURL=weights.service.js.map