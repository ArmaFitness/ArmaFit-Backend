import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    sendMessage(req: any, dto: SendMessageDto): Promise<import(".prisma/client").Message>;
    getConversation(req: any, otherUserId: number): Promise<import(".prisma/client").Message[]>;
}
