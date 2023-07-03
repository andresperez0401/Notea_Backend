/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadNota } from './entities/EntidadNota';
import { NotaController } from './controller/Nota.controller';
import { RepositorioNotaImp } from './repository/RepositorioNotaImp';
import { CrearNotaService } from '../Aplicacion/CrearNota.service';
import { EliminarNotaService } from '../Aplicacion/EliminarNota.service';
import { ModificarNotaService } from '../Aplicacion/ModificarNota.service';
import { BuscarNotas } from '../Aplicacion/BuscarNotas.service';
import { cambiarGrupoNotaService } from '../Aplicacion/cambiarGrupoNota.service';
import EntidadImagen from './entities/EntidadImagen';
import EntidadTarea from './entities/EntidadTarea';
import { buscarNotasDeGrupoService } from '../Aplicacion/BuscarNotaDeGrupoService';
import { cambiarEstadoNotaService } from '../Aplicacion/cambiarEstadoNota.service';
import { BuscarNotasDeGruposService } from '../Aplicacion/BuscarNotasGruposService';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadNota, EntidadImagen, EntidadTarea])],
  controllers: [NotaController],
  providers: [ // Aqui se agregan los servicios
    CrearNotaService,
    EliminarNotaService,
    ModificarNotaService,
    BuscarNotas,
    buscarNotasDeGrupoService,
    cambiarGrupoNotaService,
    cambiarEstadoNotaService,
    BuscarNotasDeGruposService,
    RepositorioNotaImp,
    { // Aqui se agregan los repositorios, se debe especificar la clase que implementa la interfaz
      provide: 'RepositorioNota',
      useClass: RepositorioNotaImp
    }
  ],
})
export class NotaModule {}
