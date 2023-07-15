import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class buscarGruposDeUsuarioService implements IAplicationService<string, Iterable<Grupo>> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor( 
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  async execute(idUsuarioDueno: string): Promise<Either<Iterable<Grupo>, Error>> {
    return await this.repositorioGrupo.buscarGruposDeUsuario(idUsuarioDueno);
  }
}