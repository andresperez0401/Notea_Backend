import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearGrupoDto } from './dto/CrearGrupo.dto';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class CrearGrupoService implements IAplicationService<CrearGrupoDto, Grupo> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor(
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  
  async execute(s: CrearGrupoDto): Promise<Either<Grupo, Error>> {
     const grupo =  Grupo.crearGrupo( //factory agregado
      s.nombre,
      s.idUsuario,
    );
    return await this.repositorioGrupo.creargrupo(grupo);
  }
}