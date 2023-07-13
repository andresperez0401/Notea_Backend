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
import { buscarGruposService } from 'src/Grupo/Aplicacion/buscarGruposService';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';

@Controller('grupo')
export class buscarGruposController {
  constructor(
    private buscarGrupoAllService: buscarGruposService,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
    ){
        this.logger = new ILoggerImplementation();  
        this.buscarGrupoAllService = new buscarGruposService(this.repositorioGrupo);
    }

  @Get('/all')
  async buscarGrupos(@Res() response) {
    const decorator = new LoggerService<string,Iterable<Grupo>>(this.logger,this.buscarGrupoAllService,"Buscar todos los grupos service: se han buscado todos los grupos ");

    const respuesta = await decorator.execute("");

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }
}