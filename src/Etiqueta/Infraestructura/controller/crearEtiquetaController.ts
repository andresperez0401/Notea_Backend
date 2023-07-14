import {
    Body,
    Controller,
    Inject,
    Post,
    Get,
    Delete,
    Put,
    Param,
    Res,
    Patch,
  } from '@nestjs/common';
import { Either } from 'src/Utils/Either';
import { Etiqueta } from 'src/Etiqueta/Dominio/AgregadoEtiqueta';
import { crearEtiquetaService } from '../../Aplicacion/crearEtiqueta.service';
import { crearEtiquetaDto } from '../../Aplicacion/dto/crearEtiqueta.dto';
import { repositorioEtiquetaImp } from '../repository/repositorioEtiquetaImp';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation'; 

@Controller('etiqueta')
export class crearEtiquetaController {
  constructor(
    private logger: ILoggerImplementation,
    private CrearEtiquetaService: crearEtiquetaService,
    private repositorio: repositorioEtiquetaImp,
  ) {
    this.logger = new ILoggerImplementation();
    this.CrearEtiquetaService = new crearEtiquetaService(this.repositorio);
 }

 @Post()
 async crearEtiqueta(
   @Res() response,
   @Body() etiqueta: crearEtiquetaDto,
 ): Promise<Either<Etiqueta, Error>> {

   const decorator = new LoggerService<crearEtiquetaDto, Etiqueta>(this.logger, this.CrearEtiquetaService, "Crear Etiqueta Service: La etiqueta: " + etiqueta.nombre + ", del usuario de id: " + etiqueta.idUsuario + " ha sido creada");
   const result = await decorator.execute(etiqueta);

   if (result.isLeft()) {
     return response.status(200).json(result.getLeft());
   } else {
     return response.status(404).json(result.getRight().message);
   }
 }
}