/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';

export class buscarNotasDeGrupoService implements IAplicationService<null, Iterable<Nota>> {

  private readonly repositorioNota: RepositorioNota;
  constructor( 
    @Inject('RepositorioNota')
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }
  async execute(idGrupo: string): Promise<Either<Iterable<Nota>, Error>> {
    return await this.repositorioNota.buscarNotasDeGrupo(idGrupo);
  }
}