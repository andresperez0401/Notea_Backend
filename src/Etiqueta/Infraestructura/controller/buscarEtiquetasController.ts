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
import { buscarEtiquetasService } from 'src/Etiqueta/Aplicacion/buscarEtiquetas.service';
import { repositorioEtiquetaImp } from '../repository/repositorioEtiquetaImp';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';

@Controller('etiqueta')
export class buscarEtiquetasController {
  constructor(
    private BuscarEtiquetasService: buscarEtiquetasService,
    private repositorio: repositorioEtiquetaImp,
    private logger: ILoggerImplementation,
  ) {
    this.logger = new ILoggerImplementation();
    this.BuscarEtiquetasService = new buscarEtiquetasService(this.repositorio);
  }

  @Get('/:idUsuario/all')
  async buscarEtiquetas(
    @Res() response,
    @Param('idUsuario') idUsuario: string
  ): Promise<Either<Iterable<Etiqueta>, Error>> {

    const decorator = new LoggerService<string, Iterable<Etiqueta>> (this.logger, this.BuscarEtiquetasService, "Buscar Etiquetas Service: Se han buscado todas las etiquetas del usuario de id: " + idUsuario);
    const result = await decorator.execute(idUsuario);
  
    if (result.isLeft()) {
      return response.status(200).json(result.getLeft());
    } else {
      return response.status(404).json(result.getRight().message);
  
    }
  }
}
