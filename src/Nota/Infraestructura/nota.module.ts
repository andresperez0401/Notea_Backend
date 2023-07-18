/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
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
import { buscarNotasDeGrupoService } from '../Aplicacion/BuscarNotaDeGrupo.service';
import { cambiarEstadoNotaService } from '../Aplicacion/cambiarEstadoNota.service';
import { BuscarNotasDeGruposService } from '../Aplicacion/BuscarNotasGrupos.service';
import EntidadContenido from './entities/EntidadContenido';
import EntidadTexto from './entities/EntidadTexto';
import { AggNotaToEntityService } from './servicios/AggNotaToEntityService'
import { EntityToAggNotaService } from './servicios/EntityToAggNotaService';
import { EntityToStringService } from './servicios/EntityToStringService';
import { DecoratorModule } from 'src/Decorators/Infraestructura/decorator.module';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { buscarNotasController } from './controller/buscarNotasController';
import { cambiarEstadoNotaController } from './controller/cambiarEstadoNotaController';
import { moverNotaGrupoController } from './controller/moverNotaGrupoController';
import { buscarNotasDeGrupoController } from './controller/buscarNotasDeGrupoController';
import { buscarNotasDeUsuarioController } from './controller/buscarNotasDeGruposDeUsuarioController';
import { upadateNotaController } from './controller/updateNotaController';
import { eliminarNotaController } from './controller/eliminarNotaController';
import { crearNotaController } from './controller/crearNotaController';


@Module({
  imports: [TypeOrmModule.forFeature([EntidadNota, EntidadImagen, EntidadTarea, EntidadContenido, EntidadTexto]),forwardRef(() => DecoratorModule)],
  controllers: [NotaController,buscarNotasController,cambiarEstadoNotaController,moverNotaGrupoController, buscarNotasDeGrupoController,buscarNotasDeUsuarioController,upadateNotaController,eliminarNotaController,crearNotaController],
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
    AggNotaToEntityService,
    EntityToAggNotaService,
    EntityToStringService,
    ILoggerImplementation,
    LoggerService,
    { // Aqui se agregan los repositorios, se debe especificar la clase que implementa la interfaz
      provide: 'RepositorioNota',
      useClass: RepositorioNotaImp
    }
  ],
  exports: [CrearNotaService,RepositorioNotaImp,AggNotaToEntityService,EntityToStringService], 

})
export class NotaModule {}
