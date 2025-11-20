import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    private assertCommunicationAllowed;
    sendMessage(senderId: number, dto: SendMessageDto): Promise<import(".prisma/client").Message>;
    getConversation(userId: number, otherId: number): Promise<import(".prisma/client").Message[]>;
}
