import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Inject, Logger } from '@nestjs/common';
  import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
  
  
  @WebSocketGateway(4000, { namespace: 'chat', cors: { origin: '*'} })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  
    @Inject()
    chatService: ChatService;
  
    @WebSocketServer()
    wss: Server;
  
    private logger: Logger = new Logger('MessageGateway');
  
    private count: number = 0;
  
    public async handleDisconnect(client: any): Promise<void> {
      this.count -= 1;
      this.logger.log(`Disconnected: ${this.count} connections`);
    }
  
    public async handleConnection(client: any, ...args: any[]): Promise<void> {
      this.count += 1;
      this.logger.log(`Connected: ${this.count} connections`);
      const messages: Chat[] = await this.chatService.getAll();
      client.emit('all-messages-to-client', messages);
    }
  
    public async afterInit(server: any): Promise<void> {
      this.logger.log('MessageGateway Initialized');
    }
  
    @SubscribeMessage('new-message-to-server')
    async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { sender: string; message: string }): Promise<void> {
      const message: Chat = await this.chatService.createMessage(data.sender, data.message);
      this.wss.emit('new-message-to-client', { message });
    }
  }