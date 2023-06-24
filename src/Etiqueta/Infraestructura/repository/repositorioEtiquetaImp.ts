import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/Utils/Either';
import { RepositorioEtiqueta } from '../../Dominio/RepositorioEtiqueta';
import { Etiqueta } from '../../Dominio/AgregadoEtiqueta';
import { entidadEtiqueta } from '../entities/entidadEtiqueta';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';
import { actualizarEtiquetaDto } from 'src/Etiqueta/Aplicacion/dto/actualizarEtiqueta.dto';

@Injectable()
export class repositorioEtiquetaImp implements RepositorioEtiqueta {
  constructor(
    @InjectRepository(entidadEtiqueta)
    private readonly repositorio: Repository<entidadEtiqueta>,
  ) {}

  buscarEtiqueta(id: string): Promise<Either<String, Error>> {
    throw new Error('Method not implemented.');
  }

  async crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Etiqueta, Error>> {
    const entidadEtiqueta: entidadEtiqueta = {
      id: etiqueta.getId(),
      nombre: etiqueta.getNombre(),
      color: etiqueta.getColor(),
      usuarioId: etiqueta.getUsuarioId() // Añade esto
    };


    const e = await this.repositorio.save(entidadEtiqueta);

    if (e){
      return Either.makeLeft<Etiqueta, Error>(etiqueta);
    } else {
      return Either.makeRight<Etiqueta, Error>(new Error('Error al crear la etiqueta'));
    }
  }


  async buscarEtiquetas(idUsuario: string): Promise<Either<Iterable<Etiqueta>,Error>> {
    const result: entidadEtiqueta[] = await this.repositorio
      .createQueryBuilder('etiqueta')
      .where('etiqueta.usuarioId = :usuarioId', { usuarioId: idUsuario })
      .getMany();

    if (result && result.length > 0) {
      const etiquetas: Etiqueta[] = result.map((etiqueta) =>
        Etiqueta.crearEtiqueta(
          etiqueta.nombre,
          colorEtiqueta[etiqueta.color],
          etiqueta.usuarioId, 
          etiqueta.id
        ),
      );
      return Either.makeLeft(etiquetas);
    } else {
      return Either.makeRight(new Error('Error al buscar las etiquetas'));

    }
  }

  
  

  async actualizarEtiqueta(Etiqueta: actualizarEtiquetaDto): Promise<Either<string, Error>> {
    const etiqueta = await this.repositorio.findOneBy({id : Etiqueta.id});

    if (etiqueta) {
        
        const result = this.repositorio.merge(etiqueta, Etiqueta);

        if (result) {
            await this.repositorio.save(etiqueta);
            return Either.makeLeft("Etiqueta actualizada");
        } else {
            return Either.makeRight(new Error('Error al modificar etiqueta'));
        }
    } else {
        return Either.makeRight(new Error('No se encontró etiqueta con id' + Etiqueta.id));
    }
  }
}
