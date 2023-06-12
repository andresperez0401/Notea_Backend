import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { userModule } from './Usuario/Infraestructura/user.module';
import { typeOrmConfig } from './databases/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
   // TypeOrmModule.forRoot(config),
    HttpModule,
    userModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
