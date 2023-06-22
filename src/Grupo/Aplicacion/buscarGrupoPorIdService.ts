
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class buscarGrupoPorIdService implements IAplicationService<string, Grupo> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor( 
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  
  async execute(s:string): Promise<Either<Grupo, Error>> {
    return await this.repositorioGrupo.buscarGrupoPorId(s);
  }
    
}