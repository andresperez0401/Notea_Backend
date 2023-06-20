import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Delete,
  Param,
  Res,
} from '@nestjs/common';
import { Either } from 'src/Utils/Either';
import { Etiqueta } from 'src/Etiqueta/dominio/AgregadoEtiqueta';
import { crearEtiquetaService } from '../../Aplicacion/crearEtiqueta.service';
import { crearEtiquetaDto } from '../../Aplicacion/dto/crearEtiqueta.dto';
//import { modificarEtiquetaService } from 'src/Etiqueta/Aplicacion/modificarEtiqueta.service';
//import { moificarEtiquetaDto } from 'src/Etiqueta/Aplicacion/dto/modificarEtiqueta.dto';
import { buscarEtiquetasService } from 'src/Etiqueta/Aplicacion/buscarEtiquetas.service';
//import { buscarEtiquetaDto } from 'src/Etiqueta/Aplicacion/dto/buscarEtiquetas.dto';

@Controller('etiqueta')
export class EtiquetaController {
  constructor(
    @Inject(crearEtiquetaService)
    //@Inject(modificarEtiquetaService)
    @Inject(buscarEtiquetasService)
    private readonly CrearEtiquetaService: crearEtiquetaService,
    //private readonly modificarEtiquetaService: modificarEtiquetaService,
    private readonly BuscarEtiquetasService: buscarEtiquetasService,
  ) {
    this.CrearEtiquetaService = CrearEtiquetaService;
    //this.modificarEtiquetaService = modificarEtiquetaService;
    this.BuscarEtiquetasService = BuscarEtiquetasService;
  }

  @Get('/all')
  async buscarEtiquetas(@Res() response): Promise<Either<Iterable<Etiqueta>, Error>> {
    const result = await this.BuscarEtiquetasService.execute(null);

    if (result.isLeft()) {
      return response.status(200).json(result.getLeft());
    }
    else {
      return response.status(404).json(result.getRight().message);
    }
  }
  @Post()
  async crearEtiqueta(
    @Res() response, 
    @Body() etiqueta: crearEtiquetaDto,
  ): Promise<Either<Etiqueta, Error>> {
    const result = await this.CrearEtiquetaService.execute(etiqueta);

    if (result.isLeft()) {
      return response.status(200).json(result.getLeft());
    }
    else {
      return response.status(404).json(result.getRight().message);
    }
  }
}
