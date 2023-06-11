import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], //aca debemos importar todos los modulos que vayamos creando
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
