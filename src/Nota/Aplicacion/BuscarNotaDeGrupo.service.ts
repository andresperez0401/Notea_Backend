import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';

export class buscarNotasDeGrupoService implements IAplicationService<string, string> {

  private readonly repositorioNota: RepositorioNota;
  constructor( 
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }
  async execute(idGrupo: string): Promise<Either<string, Error>> {
    return await this.repositorioNota.buscarNotasDeGrupo(idGrupo);
  }
}