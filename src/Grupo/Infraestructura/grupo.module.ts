import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadGrupo } from './entities/EntidadGrupo';
import { RepositorioGrupoImp } from './repository/RepositorioGrupoImpl';
import { CrearGrupoService } from '../Aplicacion/crearGrupoService';
import { GrupoController } from './controllers/grupoController';
import { buscarGruposService } from '../Aplicacion/buscarGruposService';
import { eliminarGrupoService } from '../Aplicacion/eliminarGrupoService';
import { buscarGruposDeUsuarioService } from '../Aplicacion/buscarGruposDeUsuarioService';
import { EditarGrupoService } from '../Aplicacion/editarGrupoService';
import { buscarGrupoPorIdService } from '../Aplicacion/buscarGrupoPorIdService';
import { DecoratorModule } from 'src/Decorators/Infraestructura/decorator.module';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { EntidadUsuario } from 'src/Usuario/Infraestructura/entities/EntidadUsuario';
import { buscarGrupoPorIdController } from './controllers/buscarGrupoPorIdController';
import { crearGrupoController } from './controllers/crearGrupoController';
import { buscarGruposController } from './controllers/buscarGruposController';
import { eliminarGrupoController } from './controllers/eliminarGrupoController';
import { buscarGrupoUsuarioController } from './controllers/buscarGrupoUsuarioController';
import { EditarGrupoController } from './controllers/editarGrupoController';
import { grupoAPapeleraController } from './controllers/grupoAPapeleraController';
import { GrupoAPapeleraservice } from '../Aplicacion/grupoAPapeleraService';
import { EntidadNota } from 'src/Nota/Infraestructura/entities/EntidadNota';
import { AggNotaToEntityService } from 'src/Nota/Infraestructura/servicios/AggNotaToEntityService';
import { EntityToAggNotaService } from 'src/Nota/Infraestructura/servicios/EntityToAggNotaService';
import { EntityToStringService } from 'src/Nota/Infraestructura/servicios/EntityToStringService';
import { TestModule } from 'test/test/test.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadGrupo, EntidadUsuario, EntidadNota]),
    forwardRef(() => DecoratorModule),
    forwardRef(() => TestModule),
    EntityToStringService,
  ],
  controllers: [
    GrupoController,
    buscarGrupoPorIdController,
    crearGrupoController,
    buscarGruposController,
    eliminarGrupoController,
    buscarGrupoUsuarioController,
    EditarGrupoController,
    grupoAPapeleraController,
  ],
  providers: [
    CrearGrupoService,
    buscarGruposService,
    eliminarGrupoService,
    buscarGruposDeUsuarioService,
    EditarGrupoService,
    buscarGrupoPorIdService,
    RepositorioGrupoImp,
    ILoggerImplementation,
    GrupoAPapeleraservice,
    AggNotaToEntityService,
    EntityToAggNotaService,
    {
      provide: 'RepositorioGrupo',
      useClass: RepositorioGrupoImp,
    },
  ],
  exports: [CrearGrupoService, RepositorioGrupoImp],
})
export class GrupoModule {}
