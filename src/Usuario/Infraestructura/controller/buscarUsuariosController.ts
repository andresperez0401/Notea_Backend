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
import { BuscarUsuariosService } from 'src/Usuario/Aplicacion/BuscarUsuarios.service';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';

@Controller('usuario')
export class buscarUsuariosController {
  constructor(
    private buscarUsuarios: BuscarUsuariosService,
    private repoUsuario: RepositorioUsuarioImp,
    private logger: ILoggerImplementation,
) {
    this.logger = new ILoggerImplementation();
    this.buscarUsuarios = new BuscarUsuariosService(this.repoUsuario);
}

 //Buscar por email
 @Get('/all')
 async buscarTodosLosUsuarios(@Res() response) {
   const decorator = new LoggerService<string,Iterable<Usuario>>(this.logger,this.buscarUsuarios,"Buscar Todos los Usuarios Service: Se han buscado todos los usuarios");
    
    const respuesta = await decorator.execute("");

   if(respuesta.isLeft()){
     return response.status(200).json(respuesta.getLeft());
   }
   else{
     return response.status(404).json(respuesta.getRight().message);
   }
 }

}