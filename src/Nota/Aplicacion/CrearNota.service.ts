/* eslint-disable prettier/prettier */
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearNotaDto } from './dto/CrearNota.dto';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { EstadoEnum } from '../Dominio/ValueObjectsNota/EstadoEnum';
import { Optional } from 'src/Utils/Opcional';
import { VOImagen } from '../Dominio/Entidades/VOImagen';

export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;
  constructor(
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }

  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const estado = EstadoEnum.GUARDADO;
    
    let contenido = new Optional<any>();
    if (s.contenido){
      const auxcontenido = JSON.stringify(s.contenido);
      contenido = new Optional<any>(JSON.parse(auxcontenido)); 
      //como el contenido puede tener varios tipos de datos, lo pasamos a string y luego lo parseamos
    }

    const opLatitud = new Optional<number>(s.latitud);
    const opLongitud = new Optional<number>(s.longitud);
    const opEtiquetas = new Optional<string[]>(s.etiquetas);

    const nota =  Nota.crearNota( //factory agregado
      s.titulo,
      s.fechaCreacion,
      estado,
      s.grupo,
      opLatitud,
      opLongitud,
      contenido,
      opEtiquetas,
    );

    const notacreada = await this.repositorioNota.crearNota(nota);
    // if (notacreada.isLeft()) {
    //  await this.repositorioNota.guardarImagenes(nota.getId(), im);
    // }

    return notacreada;

  }

}

