import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // Tikrina ar user1 ir user2 turi ryšį per AthleteCoach
  private async assertCommunicationAllowed(senderId: number, receiverId: number) {
    const relation = await this.prisma.athleteCoach.findFirst({
      where: {
        OR: [
          { coachId: senderId, athleteId: receiverId },
          { coachId: receiverId, athleteId: senderId },
        ],
      },
    });

    if (!relation) {
      throw new HttpException('You cannot message this user.', 422);
    }
  }

  async sendMessage(senderId: number, dto: SendMessageDto) {
    await this.assertCommunicationAllowed(senderId, dto.receiverId);

    return this.prisma.message.create({
      data: {
        senderId,
        receiverId: dto.receiverId,
        content: dto.content,
      },
    });
  }

  async getConversation(userId: number, otherId: number) {
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
}
