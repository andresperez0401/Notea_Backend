import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadNota } from './entities/EntidadNota';
import { NotaController } from './controller/Nota.controller';
import { RepositorioNotaImp } from './repository/RepositorioNotaImp';
import { CrearNotaService } from '../Aplicacion/CrearNota.service';
import { EliminarNotaService } from '../Aplicacion/EliminarNota.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadNota])],
  controllers: [NotaController],
  providers: [CrearNotaService, RepositorioNotaImp,EliminarNotaService],
})
export class NotaModule {}
