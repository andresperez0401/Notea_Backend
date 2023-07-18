/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    Response,
  } from '@nestjs/common';

import { Grupo } from 'src/Grupo/Dominio/AgregadoGrupo';
import { eliminarGrupoService } from 'src/Grupo/Aplicacion/eliminarGrupoService';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
  
@Controller('grupo')
export class eliminarGrupoController {
  constructor(
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
    private deleteGrupoService: eliminarGrupoService,
  ){
    this.logger = new ILoggerImplementation();
    this.deleteGrupoService = new eliminarGrupoService(this.repositorioGrupo);
  }

    //Eliminar grupo
  @Delete(':id')
  async eliminarGrupo(@Res() response, @Param('id') id: string) {
     const decorator = new LoggerService<string,string>(this.logger,this.deleteGrupoService,"Eliminar Grupo Service: El grupo de id: " + id + " ha sido eliminado con exito");
   
    const respuesta = await decorator.execute(id);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }
}
