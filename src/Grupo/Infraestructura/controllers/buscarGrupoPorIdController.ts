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
  }from '@nestjs/common';


import { Grupo } from 'src/Grupo/Dominio/AgregadoGrupo';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';
import { buscarGrupoPorIdService } from 'src/Grupo/Aplicacion/buscarGrupoPorIdService';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';


@Controller('grupo')
export class buscarGrupoPorIdController {

    constructor(
    private buscarPorIdService: buscarGrupoPorIdService,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
    ){
        this.logger = new ILoggerImplementation();
        this.buscarPorIdService = new buscarGrupoPorIdService(this.repositorioGrupo);
    }


@Get('id/:id')
async buscarGrupoPorId(@Res() response, @Param('id') id: string) {

  const decorator = new LoggerService<string,Grupo>(this.logger,this.buscarPorIdService,"BuscarGrupoPorIdService: se ha buscado el grupo de id: " + id);
  const respuesta = await decorator.execute(id);  

  if(respuesta.isLeft()){
    return response.status(200).json(respuesta.getLeft());
  }
  else{
    return response.status(404).json(respuesta.getRight().message);
  }
 }
}