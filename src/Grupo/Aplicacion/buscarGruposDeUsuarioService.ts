/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class buscarGruposDeUsuarioService implements IAplicationService<null, Iterable<Grupo>> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor( 
    @Inject('RepositorioGrupo')
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  async execute(idUsuarioDueno: string): Promise<Either<Iterable<Grupo>, Error>> {
    return await this.repositorioGrupo.buscarGruposDeUsuario(idUsuarioDueno);
  }
}