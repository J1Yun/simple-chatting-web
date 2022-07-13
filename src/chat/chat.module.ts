import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}