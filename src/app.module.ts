import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { NotaModule } from './Nota/Infraestructura/nota.module';

@Module({
  imports: [DatabaseModule, NotaModule], //aca debemos importar todos los modulos que vayamos creando
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
