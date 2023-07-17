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
import { EncontrarPorIdService } from 'src/Usuario/Aplicacion/EncontrarPorId.service';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';

@Controller('usuario')
export class buscarUsuarioPorIdController {
  constructor(
    private buscarPorId: EncontrarPorIdService,
    private repoUsuario: RepositorioUsuarioImp,
    private logger: ILoggerImplementation,
) {
    this.logger = new ILoggerImplementation();
    this.buscarPorId = new EncontrarPorIdService(this.repoUsuario);
}

 //Buscar por id
 @Get('id/:id')
 async buscarUsuarioPorId(@Res() response, @Param('id') id: string) {
    const decorator = new LoggerService<string,Usuario>(this.logger,this.buscarPorId,"Buscar Usuario por Id Service: Se ha buscado el usuario de id: " + id);
    
    const respuesta = await decorator.execute(id);

   if(respuesta.isLeft()){
     return response.status(200).json(respuesta.getLeft());
   }
   else{
     return response.status(404).json(respuesta.getRight().message);
   }
 }

}