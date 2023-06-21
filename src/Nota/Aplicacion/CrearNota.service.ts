/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearNotaDto } from './dto/CrearNota.dto';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { EstadoEnum } from '../Dominio/ValueObjectsNota/EstadoEnum';

export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;
  constructor(
    @Inject('RepositorioNota') 
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }

  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const estado = EstadoEnum.GUARDADO;

    const nota =  Nota.crearNota( //factory agregado
      s.titulo,
      s.contenido,
      s.fechaCreacion,
      estado,
      s.latitud,
      s.longitud,
      s.grupo
    );
    
    return await this.repositorioNota.crearNota(nota);
  }

}

