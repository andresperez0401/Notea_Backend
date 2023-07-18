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
import { buscarSuscripcionDeUsuarioService } from 'src/Suscripcion/Aplicacion/buscarPorIdUsuarioSevice';
  

@Controller('suscripcion')
export class buscarSucripcionDeUsuarioController {
  constructor(
    private buscarSuscripcionService: buscarSuscripcionDeUsuarioService,
    private repositorio: RepositorioSuscripcionImp,
    private logger: ILoggerImplementation,
  ){
    this.logger = new ILoggerImplementation();
    this.buscarSuscripcionService = new buscarSuscripcionDeUsuarioService(this.repositorio);
  }

@Get('/:idUsuario')
  async buscarSuscripcionUsuario(@Res() response, @Param('idUsuario') idUsuario: string) {

    const decorator = new LoggerService<String,Suscripcion>(this.logger,this.buscarSuscripcionService,"Buscar Suscripcion de usuario Service: la suscripcion del usuario de id: " + idUsuario + " ha sido encontrada");
    const respuesta = await decorator.execute(idUsuario);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }

}