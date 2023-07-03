import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { CambiarGrupoNotaDto } from './dto/CambiarGrupoNota.dto';

export class cambiarGrupoNotaService implements IAplicationService<CambiarGrupoNotaDto, string> {

  private readonly repositorioNota: RepositorioNota;

    constructor ( 
        repositorioNota: RepositorioNota ){
        this.repositorioNota = repositorioNota;
    }
  
  async execute(cambiarGrupoNota: CambiarGrupoNotaDto): Promise<Either<string, Error>> {
    return await this.repositorioNota.cambiarGrupoNota(cambiarGrupoNota.id, cambiarGrupoNota.idGrupo)
  }
}