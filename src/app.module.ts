import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotaController } from './Nota/Infraestructura/Nota.controller';
import { CrearNotaService } from './Nota/Aplicacion/CrearNota.service';

@Module({
  imports: [], //aca debemos importar todos los modulos que vayamos creando
  controllers: [AppController, NotaController],
  providers: [AppService, CrearNotaService],
})
export class AppModule {}
