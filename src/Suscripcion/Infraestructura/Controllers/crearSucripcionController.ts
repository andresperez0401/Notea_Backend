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

import { Suscripcion } from 'src/Suscripcion/Dominio/AgregadoSuscripcion';
import { RepositorioSuscripcionImp } from '../RepositorioSuscripcionImpl';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { RepositorioSuscripcion } from 'src/Suscripcion/Dominio/repositorioSuscripcion';
import { CrearSuscripcionService } from 'src/Suscripcion/Aplicacion/crearSuscripcionService';
import { CrearSuscripcionDto } from 'src/Suscripcion/Aplicacion/dto/CrearSuscripcion.dto';
  

@Controller('suscripcion')
export class crearSucripcionController {
  constructor(
    private crearSuscripcionService: CrearSuscripcionService,
    private repositorio: RepositorioSuscripcionImp,
    private logger: ILoggerImplementation,
  ){
    this.logger = new ILoggerImplementation();
    this.crearSuscripcionService = new CrearSuscripcionService(this.repositorio);
  }

@Post()
  async crearSuscripcion(@Res() response, @Body() payload: CrearSuscripcionDto) {

    const decorator = new LoggerService<CrearSuscripcionDto,Suscripcion>(this.logger,this.crearSuscripcionService,"Crear Suscripcion Service: El usuario de id " + payload.idUsuario + " se ha suscrito con exito");
    const respuesta = await decorator.execute(payload);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }


}
