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

import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { EliminarUsuarioService } from 'src/Usuario/Aplicacion/EliminarUsuario.service';
import { RepositorioUsuarioImp } from '../repository/RepositorioUsuarioImp';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';

@Controller('usuario')
export class eliminarUsuarioController {
  constructor(
    private eliminarUsuarioService: EliminarUsuarioService,
    private repoUsuario: RepositorioUsuarioImp,
    private logger: ILoggerImplementation,
) {
    this.logger = new ILoggerImplementation();
    this.eliminarUsuarioService = new EliminarUsuarioService(this.repoUsuario);
}


 //Eliminar usuario
 @Delete(':id')
 async eliminarUsuario(@Res() response, @Param('id') id: string) {
    
    const decorator = new LoggerService<string,string>(this.logger,this.eliminarUsuarioService,"Eliminar Usuario Service: El usuario de id: " + id + " ha sido eliminado con exito");
    
    const respuesta = await decorator.execute(id);

   if(respuesta.isLeft()){
     return response.status(200).json(respuesta.getLeft());
   }
   else{
     return response.status(404).json(respuesta.getRight().message);
   }
 }

}