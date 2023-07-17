/* eslint-disable prettier/prettier */
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';

export class BuscarNotasDeGruposService
  implements IAplicationService<Iterable<string>, string>
{
  private repositorioNota: RepositorioNota;
  constructor(repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }
  async execute(
    grupos: Iterable<string>,
  ): Promise<Either<string, Error>> {
    return await this.repositorioNota.buscarNotasDeGrupos(grupos);
  }
}
