/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IAplicationService } from 'src/@Core/aplicacion/IAplicationService';
import { CrearNotaDto } from '../Infraestructura/dto/CrearNota.dto';
import { Either } from 'src/Utils/Either';
import { Nota } from '../dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { RepositorioNotaImp } from '../Infraestructura/RepositorioNotaImp';
import { VOubicacionNota } from '../Dominio/ValueObjects/VOUbicacionNota';
import { IdNota } from '../Dominio/ValueObjects/IdNota';
import { VOTituloNota } from '../Dominio/ValueObjects/VOTituloNota';
import { VOContenidoNota } from '../Dominio/ValueObjects/VOContenidoNota';
import { EstadoEnum } from '../Dominio/ValueObjects/EstadoEnum';

@Injectable()
export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;

  constructor(repositorioNota: RepositorioNotaImp) {
    this.repositorioNota = repositorioNota;
  }
  
  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const nota =  Nota.crearNota(
      s.titulo,
      s.contenido,
      s.fechaCreacion,
      EstadoEnum.GUARDADO,
      s.latitud, 
      s.longitud
    );
    
    return await this.repositorioNota.crearNota(nota);
  }
    
}

