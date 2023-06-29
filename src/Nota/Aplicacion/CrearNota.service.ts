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
import { JsonContains } from 'typeorm';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';

export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;
  constructor(
    @Inject('RepositorioNota') 
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }

  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const estado = EstadoEnum.GUARDADO;
    
    let im;

    if (s.imagenes) {
      console.log("entra");
      im = s.imagenes.map((i) => {
      return VOImagen.crearImagenNota(i.nombre, i.buffer); 
      });
    }

    let ncheck;
    let ntitulos;

    if (s.tareas){
       ncheck = s.tareas.map((t) => {
        return t.check;
      });

       ntitulos = s.tareas.map((t) => {
        return t.titulo;
      });
    }


    //si hacemos un multipart las tareas se mandan como un string y hay que parsearlo

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
      new Optional(ntitulos),
      new Optional(ncheck),
      new Optional(),
      null,
      im,
    );

    const notacreada = await this.repositorioNota.crearNota(nota);
    // if (notacreada.isLeft()) {
    //  await this.repositorioNota.guardarImagenes(nota.getId(), im);
    // }

    return notacreada;

  }

}

