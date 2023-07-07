import { Module } from '@nestjs/common';
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
import { GrupoModule } from 'src/Grupo/Infraestructura/grupo.module';
import { NotaModule } from 'src/Nota/Infraestructura/nota.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadUsuario]),
    CqrsModule,
    EtiquetaModule,
    NotaModule,
    GrupoModule, 
  ],
  controllers: [UsuarioController],
  providers: [
    CrearUsuarioService,
    BuscarUsuariosService,
    EncontrarPorEmailService,
    EncontrarPorIdService,
    EliminarUsuarioService,
    EditarUsuarioService,
    LoguearUsuarioService,
    UsuarioCreadoEventHandler,

    {
      provide: 'RepositorioUsuario',
      useClass: RepositorioUsuarioImp,
    },
    {
      provide: 'EventPublisher',
      useClass: EventPublisherImpl,
    },
  ],
})
export class UsuarioModule {}
