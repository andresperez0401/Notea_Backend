import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { BuscarPorPalabraDto } from './dto/buscarPorPalabraDto';

export class BuscarNotasPorPalabraService
  implements IAplicationService<BuscarPorPalabraDto, string>
{
  private repositorioNota: RepositorioNota;
  constructor(repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }
  async execute(
    parametro: BuscarPorPalabraDto,
  ): Promise<Either<string, Error>> {
    return await this.repositorioNota.buscarNotaPorPalabra(parametro.palabra, parametro.grupos);
  }
}
