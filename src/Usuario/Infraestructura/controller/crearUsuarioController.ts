import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Res,
    Response,
  } from '@nestjs/common';

import { CrearUsuarioDto} from '../../Aplicacion/dto/CrearUsuario.dto';
import { CrearUsuarioService } from 'src/Usuario/Aplicacion/CrearUsuario.service';
import { EventPublisher } from 'src/core/domain/events/EventPublisher';
import { RepositorioUsuarioImp } from '../repository/RepositorioUsuarioImp';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { EncontrarPorEmailService } from 'src/Usuario/Aplicacion/EncontrarPorEmail.service';
import { EventPublisherImpl } from '../events/EventPublisherImpl';

@Controller('usuario')
export class crearUsuarioController {
  constructor(
    private usuarioService: CrearUsuarioService,
    private logger: ILoggerImplementation,
    private repoUsuario: RepositorioUsuarioImp,
    private event: EventPublisherImpl,
    private buscarUsuariosEmailService: EncontrarPorEmailService,
    

  ) {
    this.logger = new ILoggerImplementation();
    this.usuarioService = new CrearUsuarioService(this.repoUsuario,event);
    this.buscarUsuariosEmailService = new EncontrarPorEmailService(this.repoUsuario);
    
}

@Post()
async crearUsuario(@Res() response, @Body() payload: CrearUsuarioDto) {

  const decorator = new LoggerService<CrearUsuarioDto,Usuario>(this.logger,this.usuarioService,"Crear Usuario Service: El usuario: " + payload.nombre + " de email: " + payload.email + "ha sido creado con exito");
  const email = await this.buscarUsuariosEmailService.execute(payload.email);

  if(email.isRight()){

    const respuesta = await decorator.execute(payload);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  } else {
    return response.status(404).json({message: 'El email ya existe'});
  }
}
}