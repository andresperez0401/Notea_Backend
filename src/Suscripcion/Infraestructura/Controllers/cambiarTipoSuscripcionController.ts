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
import { cambiarTipoSuscripcionService } from 'src/Suscripcion/Aplicacion/cambiarTipoSuscripcionService';
import { cambiarTipoSuscripcionDto } from 'src/Suscripcion/Aplicacion/dto/CambiarTipoSuscripcionDto';
  

@Controller('suscripcion')
export class cambiarSucripcionController {
  constructor(
    private cambiarSuscripcionService: cambiarTipoSuscripcionService,
    private repositorio: RepositorioSuscripcionImp,
    private logger: ILoggerImplementation,
  ){
    this.logger = new ILoggerImplementation();
    this.cambiarSuscripcionService = new cambiarTipoSuscripcionService(this.repositorio);
  }

@Post('/cambiarTipo')
  async cambiarTipoSuscripcion(@Res() response, @Body() payload: cambiarTipoSuscripcionDto) {

    const decorator = new LoggerService<cambiarTipoSuscripcionDto,String>(this.logger,this.cambiarSuscripcionService,"Cambiar Suscripcion Service: El usuario de id " + payload.idUsuario + " ha cambiado su estado de suscripcion a: " + payload.tipo );
    const respuesta = await decorator.execute(payload);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }


}