import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';

import { Etiqueta } from 'src/Etiqueta/Dominio/AgregadoEtiqueta';
import { RepositorioEtiqueta } from 'src/Etiqueta/Dominio/RepositorioEtiqueta';

export class buscarEtiquetasService
  implements IAplicationService<string, Iterable<Etiqueta>>
{
  private readonly repositorioEtiqueta: RepositorioEtiqueta;

  constructor(
    repositorioEtiq: RepositorioEtiqueta,
  ) {
    this.repositorioEtiqueta = repositorioEtiq;
  }

  async execute(idUsuario: string): Promise<Either<Iterable<Etiqueta>, Error>> {
    return await this.repositorioEtiqueta.buscarEtiquetas(idUsuario);
  }
}
