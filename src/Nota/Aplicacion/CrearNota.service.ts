/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearNotaDto } from './dto/CrearNota.dto';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { EstadoEnum } from '../Dominio/ValueObjectsNota/EstadoEnum';
import { Optional } from 'src/Utils/Opcional';
import { VOImagen } from '../Dominio/ValueObjectsNota/VOImagen';

export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;
  constructor(
    @Inject('RepositorioNota') 
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }

  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const estado = EstadoEnum.GUARDADO;
    
    let im: VOImagen[] = [];

    if (s.imagenes.length >= 1) {
      im = s.imagenes.map((i) => {
      return VOImagen.crearImagenNota(i.nombre, i.buffer); 
      });
    }

    const opLatitud = new Optional<number>(s.latitud);
    const opLongitud = new Optional<number>(s.longitud);

    const nota =  Nota.crearNota( //factory agregado
      s.titulo,
      s.contenido,
      s.fechaCreacion,
      estado,
      s.grupo,
      opLatitud,
      opLongitud,
      null,
      im
    );
    
    const notacreada = await this.repositorioNota.crearNota(nota);
    if (notacreada.isLeft()) {
     await this.repositorioNota.guardarImagenes(nota.getId(), im);
    }

    return notacreada;

  }

}

