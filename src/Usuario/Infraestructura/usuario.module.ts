import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadUsuario } from './entities/EntidadUsuario';
import { UsuarioController } from './controller/usuario.controller';
import { RepositorioUsuarioImp } from './repository/RepositorioUsuarioImp';
import { CrearUsuarioService } from '../Aplicacion/CrearUsuario.service';
import { BuscarUsuariosService } from '../Aplicacion/BuscarUsuarios.service';
import { EncontrarPorEmailService } from '../Aplicacion/EncontrarPorEmail.service';
import { EncontrarPorIdService } from '../Aplicacion/EncontrarPorId.service';
import { EliminarUsuarioService } from '../Aplicacion/EliminarUsuario.service';
import { EditarUsuarioService } from '../Aplicacion/EditarUsuario.service';
import { LoguearUsuarioService } from '../Aplicacion/LoguearUsuario.service';

import { EventPublisherImpl } from './events/EventPublisherImpl';

import { UsuarioCreadoEventHandler } from 'src/Usuario/Infraestructura/events/UsuarioCreadoHandler';

import { EtiquetaModule } from 'src/Etiqueta/Infraestructura/etiqueta.module';
import { NotaModule } from 'src/Nota/Infraestructura/nota.module';
import { GrupoModule } from 'src/Grupo/Infraestructura/grupo.module';
import { CqrsModule } from '@nestjs/cqrs';
import { editarUsuarioController } from './controller/editarUsuarioController';
import { DecoratorModule } from 'src/Decorators/Infraestructura/decorator.module';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { EntidadGrupo } from 'src/Grupo/Infraestructura/entities/EntidadGrupo';
import { entidadEtiqueta } from 'src/Etiqueta/Infraestructura/entities/entidadEtiqueta';
import { loguearUsuarioController } from './controller/loguearUsuarioController';
import { eliminarUsuarioController } from './controller/eliminarUsuarioController';
import { buscarUsuarioPorIdController } from './controller/buscarUsuarioPorIdController';
import { buscarUsuarioPorEmailController } from './controller/buscarUsuarioPorEmailController';
import { buscarUsuariosController } from './controller/buscarUsuariosController';
import { crearUsuarioController } from './controller/crearUsuarioController';
import { SuscripcionModule } from 'src/Suscripcion/Infraestructura/suscripcion.module';
import { CrearSuscripcionDto } from 'src/Suscripcion/Aplicacion/dto/CrearSuscripcion.dto';
import { CrearSuscripcionService } from 'src/Suscripcion/Aplicacion/crearSuscripcionService';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadGrupo]),
    TypeOrmModule.forFeature([entidadEtiqueta]),
    TypeOrmModule.forFeature([EntidadUsuario]),
    forwardRef(() => DecoratorModule),
    forwardRef(() => CqrsModule),
    forwardRef(() => EtiquetaModule),
    forwardRef(() => GrupoModule),
    forwardRef(() => NotaModule),
    forwardRef(() => SuscripcionModule),
  ],
  controllers: [UsuarioController,
                editarUsuarioController,
                loguearUsuarioController,
                eliminarUsuarioController,
                buscarUsuarioPorIdController,
                buscarUsuarioPorEmailController,
                buscarUsuariosController,
                crearUsuarioController,
                ],
  providers: [
    CrearUsuarioService,
    BuscarUsuariosService,
    EncontrarPorEmailService,
    EncontrarPorIdService,
    EliminarUsuarioService,
    EditarUsuarioService,
    LoguearUsuarioService,
    UsuarioCreadoEventHandler,
    RepositorioUsuarioImp,
    EventPublisherImpl,
    ILoggerImplementation,
    {
      provide: 'EventPublisher',
      useClass: EventPublisherImpl,
    },

    {
      provide: 'RepositorioUsuario',
      useClass: RepositorioUsuarioImp,
    },
  ],
})
export class UsuarioModule {}
