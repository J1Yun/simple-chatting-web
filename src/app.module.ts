import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatModule } from './chat/chat.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMConfig),
    ServeStaticModule.forRoot({ rootPath: `${process.cwd()}/public` }),
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
