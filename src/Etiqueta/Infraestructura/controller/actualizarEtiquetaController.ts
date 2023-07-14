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

import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';

import { actualizarEtiquetaDto } from 'src/Etiqueta/Aplicacion/dto/actualizarEtiqueta.dto';
import { actualizarEtiquetaService } from 'src/Etiqueta/Aplicacion/actualizarEtiqueta.service';
import { Etiqueta } from 'src/Etiqueta/Dominio/AgregadoEtiqueta';
import { repositorioEtiquetaImp } from '../repository/repositorioEtiquetaImp';
import { Either } from 'src/Utils/Either';


@Controller('etiqueta')
export class actualizarEtiquetaController {
  constructor(
   
    private ActualizarEtiquetaService: actualizarEtiquetaService,
    private repositorio: repositorioEtiquetaImp,
    private logger: ILoggerImplementation,
  ) {
    this.logger = new ILoggerImplementation();
    this.ActualizarEtiquetaService = new actualizarEtiquetaService(this.repositorio);
  }

  @Patch()
  async actualizarEtiqueta(@Res() response, @Body() notaMod: actualizarEtiquetaDto): Promise<Either<string,Error>> {
 
      const decorator = new LoggerService<actualizarEtiquetaDto,string>(this.logger, this.ActualizarEtiquetaService, "Actualizar Etiqueta Service: La etiqueta de id: " + notaMod.id + " ha sido actualizada." );
      const result =  await decorator.execute(notaMod)
      if (result.isLeft()) {
          return response.status(200).json(result.getLeft());
      }
      else {
          return response.status(404).json(result.getRight().message);
      }
       
  }
}
