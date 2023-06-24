import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadUsuario } from './entities/EntidadUsuario';
import { UsuarioController } from './controller/Usuario.controller';
import { RepositorioUsuarioImp } from './repository/RepositorioUsuarioImp';
import { CrearUsuarioService } from '../Aplicacion/CrearUsuario.service';
import { BuscarUsuariosService } from '../Aplicacion/BuscarUsuarios.service';
import { EncontrarPorEmailService } from '../Aplicacion/EncontrarPorEmail.service';
import { EncontrarPorIdService } from '../Aplicacion/EncontrarPorId.service';
import { EliminarUsuarioService } from '../Aplicacion/EliminarUsuario.service';
import { EditarUsuarioService } from '../Aplicacion/EditarUsuario.service';

import { EventPublisherImpl } from './events/EventPublisherImpl';

import { UsuarioCreadoEventHandler } from '../Aplicacion/eventHandlers/UsuarioCreadoHandler';



import { EtiquetaModule } from 'src/Etiqueta/Infraestructura/etiqueta.module'; 
import { CqrsModule } from '@nestjs/cqrs';


@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadUsuario]),
    CqrsModule,
    EtiquetaModule, // Añade esta línea para importar el módulo de Etiqueta
  ],
  controllers: [UsuarioController],
  providers: [
    //RepositorioUsuarioImp,
    CrearUsuarioService,
    BuscarUsuariosService,
    EncontrarPorEmailService,
    EncontrarPorIdService,
    EliminarUsuarioService,
    EditarUsuarioService,
    RepositorioUsuarioImp,
    LoguearUsuarioService,
    {
      provide: 'RepositorioUsuario',
      useClass: RepositorioUsuarioImp,
    },
  ],
})
export class UsuarioModule {}
