import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtGuard, RolesGuard } from '../auth/guard';

@Controller('messages')
@UseGuards(JwtGuard, RolesGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // 1. Siųsti žinutę
  @Post()
  sendMessage(@Req() req, @Body() dto: SendMessageDto) {
    const senderId = req.user.id;
    return this.messagesService.sendMessage(senderId, dto);
  }

  // 2. Gauti pokalbį su konkrečiu vartotoju
  @Get(':otherUserId')
  getConversation(
    @Req() req,
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
  ) {
    const userId = req.user.id;
    return this.messagesService.getConversation(userId, otherUserId);
  }
}
