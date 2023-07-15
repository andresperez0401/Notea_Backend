import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { EliminarNotaDto } from './dto/EliminarNota.dto';

export class EliminarNotaService
  implements IAplicationService<EliminarNotaDto, string>
{
  private readonly repositorioNota: RepositorioNota;

  constructor(
    repositorioNota: RepositorioNota,
  ) {
    this.repositorioNota = repositorioNota;
  }

  async execute(id: EliminarNotaDto): Promise<Either<string, Error>> {
    return await this.repositorioNota.eliminarNota(id.id);
  }
}
