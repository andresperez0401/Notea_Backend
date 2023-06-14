/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/Utils/Either';
import { RepositorioEtiqueta } from '../../Dominio/RepositorioEtiqueta';
import { Etiqueta } from '../../Dominio/AgregadoEtiqueta';
import { entidadEtiqueta } from '../entities/entidadEtiqueta';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';

@Injectable()
export class repositorioEtiquetaImp implements RepositorioEtiqueta {
  constructor(
    @InjectRepository(entidadEtiqueta)
    private readonly repositorio: Repository<entidadEtiqueta>,
  ) {}

  async crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Etiqueta, Error>> {
    const entidadEtiqueta: entidadEtiqueta = {
      id: etiqueta.getId(),
      nombre: etiqueta.getNombre(),
      color: etiqueta.getColor(),
    };

    try {
      await this.repositorio.save(entidadEtiqueta);
      return Either.makeLeft<Etiqueta, Error>(etiqueta);
    } catch (error) {
      return Either.makeRight<Etiqueta, Error>(error);
    }
  }

  async buscarEtiquetas(): Promise<Either<Iterable<Etiqueta>,Error>>{
    try {
        const result: entidadEtiqueta[] = await this.repositorio.find();
        const etiquetas: Etiqueta[] = result.map((etiqueta) =>
            Etiqueta.crearEtiqueta(
            etiqueta.nombre,
            colorEtiqueta[etiqueta.color],
            etiqueta.id
            ),
        );

        return Either.makeLeft(etiquetas);
    } catch (error) {
        return Either.makeRight(new Error('Error al buscar las etiquetas'));
    }
}

}
