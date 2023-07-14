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

  import { loguearUsuarioDTO } from 'src/Usuario/Aplicacion/dto/LoguearUsuario.dto';
  import { LoguearUsuarioService } from 'src/Usuario/Aplicacion/LoguearUsuario.service';
  import { RepositorioUsuario } from 'src/Usuario/Dominio/RepositorioUsuario';
  import { EventPublisher } from 'src/core/domain/events/EventPublisher';
  import { RepositorioUsuarioImp } from '../repository/RepositorioUsuarioImp';
  import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';  
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';


  @Controller('usuario')
  export class loguearUsuarioController {
    constructor(
      private loguearUsuarioService: LoguearUsuarioService,
      private repoUsuario: RepositorioUsuarioImp,
      private logger: ILoggerImplementation,
 ) {
      this.logger = new ILoggerImplementation();
      this.loguearUsuarioService = new LoguearUsuarioService(this.repoUsuario);
    }


      //Loguear usuario
  @Post('/login')
  async loguearUsuario(@Res() response, @Body() payload: loguearUsuarioDTO) {
    console.log("loguear");
    const decorator = new LoggerService<loguearUsuarioDTO,Usuario>(this.logger,this.loguearUsuarioService,"Loguear Usuario Service: El usuario: " + payload.email + " ha hecho login");
    
    const respuesta = await decorator.execute(payload);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }
}
  