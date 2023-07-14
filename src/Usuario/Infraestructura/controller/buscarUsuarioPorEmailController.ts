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

import { RepositorioUsuarioImp } from '../repository/RepositorioUsuarioImp';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { EncontrarPorEmailService } from 'src/Usuario/Aplicacion/EncontrarPorEmail.service';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';

@Controller('usuario')
export class buscarUsuarioPorEmailController {
  constructor(
    private buscarPorEmail: EncontrarPorEmailService,
    private repoUsuario: RepositorioUsuarioImp,
    private logger: ILoggerImplementation,
) {
    this.logger = new ILoggerImplementation();
    this.buscarPorEmail = new EncontrarPorEmailService(this.repoUsuario);
}

 //Buscar por email
 @Get('email/:email')
 async buscarUsuarioPorEmail(@Res() response, @Param('email') email: string) {
   const decorator = new LoggerService<string,Usuario>(this.logger,this.buscarPorEmail,"Buscar Usuario por email Service: Se ha buscado el usuario de email: " + email);
    
    const respuesta = await decorator.execute(email);

   if(respuesta.isLeft()){
     return response.status(200).json(respuesta.getLeft());
   }
   else{
     return response.status(404).json(respuesta.getRight().message);
   }
 }

}