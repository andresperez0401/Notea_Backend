import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Delete,
  Param,
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
    private readonly crearEtiquetaService: crearEtiquetaService,
    //private readonly modificarEtiquetaService: modificarEtiquetaService,
    private readonly buscarEtiquetasService: buscarEtiquetasService,
  ) {
    this.crearEtiquetaService = crearEtiquetaService;
    //this.modificarEtiquetaService = modificarEtiquetaService;
    this.buscarEtiquetasService = buscarEtiquetasService;
  }

  @Get('/all')
  async getEtiquetas(): Promise<Either<Iterable<Etiqueta>, Error>> {
    const result = await this.buscarEtiquetasService.execute(null);

    if (result.isLeft()) {
      return result;
    } else {
      return Either.makeRight<Iterable<Etiqueta>, Error>(
        new Error('Error al obtener las Etiquetas'),
      );
    }
  }
  @Post()
  async save(
    @Body() etiqueta: crearEtiquetaDto,
  ): Promise<Either<Etiqueta, Error>> {
    const result = await this.crearEtiquetaService.execute(etiqueta);

    if (result.isLeft()) {
      return result;
    } else {
      return Either.makeRight<Etiqueta, Error>(
        new Error('Error al crear la etiqueta'),
      );
    }
  }
}
