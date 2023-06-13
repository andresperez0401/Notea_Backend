/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IAplicationService } from 'src/@Core/aplicacion/IAplicationService';
import { CrearNotaDto } from '../Infraestructura/dto/CrearNota.dto';
import { Either } from 'src/Utils/Either';
import { Nota } from '../dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { RepositorioNotaImp } from '../Infraestructura/repository/RepositorioNotaImp';
import { EstadoEnum } from '../Dominio/ValueObjects/EstadoEnum';

@Injectable()
export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;

  constructor(
    @Inject(RepositorioNotaImp) 
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }
  
  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const estado = EstadoEnum.GUARDADO;

    const nota =  Nota.crearNota( //factory agreagado
      s.titulo,
      s.contenido,
      s.fechaCreacion,
      estado,
      s.latitud, 
      s.longitud
    );
    
    return await this.repositorioNota.crearNota(nota);
  }
    
}

