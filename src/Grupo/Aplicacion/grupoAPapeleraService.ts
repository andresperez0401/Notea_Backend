/* eslint-disable prettier/prettier */
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';
import { GrupoAPapeleraDto } from './dto/GrupoAPapelera.dto';

export class GrupoAPapeleraservice
  implements IAplicationService<GrupoAPapeleraDto, Grupo>
{
  private readonly repositorioGrupo: RepositorioGrupo;
  constructor(repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }

    async execute(s: GrupoAPapeleraDto): Promise<Either<Grupo, Error>> {
        return await this.repositorioGrupo.grupoAPapelera(s);
  }
}
