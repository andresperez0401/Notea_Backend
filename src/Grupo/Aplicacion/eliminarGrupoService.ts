import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearGrupoDto } from './dto/CrearGrupo.dto';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class eliminarGrupoService implements IAplicationService<null, string> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor( 
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  
  async execute(s: string): Promise<Either<string, Error>> {
    
    return await this.repositorioGrupo.eliminarGrupo(s);
  }
    
}