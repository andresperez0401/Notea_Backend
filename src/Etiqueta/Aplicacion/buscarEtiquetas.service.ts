import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/utils/either';
import { Injectable, Inject } from '@nestjs/common';

import { Etiqueta } from '../dominio/AgregadoEtiqueta';
import { RepositorioEtiqueta } from '../Dominio/RepositorioEtiqueta';
import { repositorioEtiquetaImp } from '../Infraestructura/repository/RepositorioEtiquetaImp';

export class buscarEtiquetasService implements IAplicationService<string, Iterable<Etiqueta>> {
  private readonly repositorioEtiqueta: RepositorioEtiqueta;

  constructor(
    @Inject(repositorioEtiquetaImp)
    repositorioEtiq: RepositorioEtiqueta,
  ) {
    this.repositorioEtiqueta = repositorioEtiq;
  }

  async execute(idUsuario: string): Promise<Either<Iterable<Etiqueta>, Error>> {
    return await this.repositorioEtiqueta.buscarEtiquetas(idUsuario);
  }
}

