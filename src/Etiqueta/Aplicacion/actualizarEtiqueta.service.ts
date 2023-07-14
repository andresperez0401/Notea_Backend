import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { actualizarEtiquetaDto } from './dto/actualizarEtiqueta.dto';
import { Either } from 'src/Utils/Either';

import { RepositorioEtiqueta } from '../Dominio/RepositorioEtiqueta';

export class actualizarEtiquetaService
  implements IAplicationService<actualizarEtiquetaDto, string>
{
  private readonly repositorio: RepositorioEtiqueta;

  constructor(
    @Inject('RepositorioEtiqueta')
    repositorioEtiqueta: RepositorioEtiqueta,
  ) {
    this.repositorio = repositorioEtiqueta;
  }

  async execute(s: actualizarEtiquetaDto): Promise<Either<string, Error>> {
    return await this.repositorio.actualizarEtiqueta(s);
  }
}
