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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertCommunicationAllowed(senderId, receiverId) {
        const relation = await this.prisma.athleteCoach.findFirst({
            where: {
                OR: [
                    { coachId: senderId, athleteId: receiverId },
                    { coachId: receiverId, athleteId: senderId },
                ],
            },
        });
        if (!relation) {
            throw new common_1.ForbiddenException('You cannot message this user.');
        }
    }
    async sendMessage(senderId, dto) {
        await this.assertCommunicationAllowed(senderId, dto.receiverId);
        return this.prisma.message.create({
            data: {
                senderId,
                receiverId: dto.receiverId,
                content: dto.content,
            },
        });
    }
    async getConversation(userId, otherId) {
        await this.assertCommunicationAllowed(userId, otherId);
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherId },
                    { senderId: otherId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: 'asc' },
        });
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map