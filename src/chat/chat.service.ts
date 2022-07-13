import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>
      ) {}
  public getAll = async (): Promise<Chat[]> => {
    return this.chatRepository.find();
  };

  public createMessage = async (
    sender: string,
    message: string,
  ): Promise<Chat> => {
    const newMessage: Chat = this.chatRepository.create({sender, message});
    return this.chatRepository.save(newMessage);
  };
}