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
import { CrearGrupoService } from 'src/Grupo/Aplicacion/crearGrupoService';
import { CrearGrupoDto} from 'src/Grupo/Aplicacion/dto/CrearGrupo.dto';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
  

@Controller('grupo')
export class crearGrupoController {
  constructor(
    private crearGrupoService: CrearGrupoService,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
  ){
    this.logger = new ILoggerImplementation();
    this.crearGrupoService = new CrearGrupoService(this.repositorioGrupo);
  }

@Post()
  async crearGrupo(@Res() response, @Body() payload: CrearGrupoDto) {

    const decorator = new LoggerService<CrearGrupoDto,Grupo>(this.logger,this.crearGrupoService,"El grupo: " + payload.nombre + " ha sido creado con exito");
    const respuesta = await decorator.execute(payload);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }


}
