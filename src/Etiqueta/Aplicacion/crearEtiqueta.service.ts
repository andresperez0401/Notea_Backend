import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { crearEtiquetaDto } from './dto/crearEtiqueta.dto';
import { Either } from 'src/Utils/Either';
import { Etiqueta } from '../dominio/AgregadoEtiqueta';
import { RepositorioEtiqueta } from '../dominio/RepositorioEtiqueta';
import { colorEtiqueta } from '../Dominio/ValueObjectsEtiqueta/colorEtiqueta';

export class crearEtiquetaService
  implements IAplicationService<crearEtiquetaDto, Etiqueta>
{
  private readonly repositorioEtiqueta: RepositorioEtiqueta;
  constructor(
    @Inject('RepositorioEtiqueta')
    repositorioEtiqueta: RepositorioEtiqueta,
  ) {
    this.repositorioEtiqueta = repositorioEtiqueta;
  }

  async execute(s: crearEtiquetaDto): Promise<Either<Etiqueta, Error>> {
    const color = colorEtiqueta.AMARILLO;

    const etiqueta = Etiqueta.crearEtiqueta(s.nombre, color);

    return await this.repositorioEtiqueta.crearEtiqueta(etiqueta);
  }
}
