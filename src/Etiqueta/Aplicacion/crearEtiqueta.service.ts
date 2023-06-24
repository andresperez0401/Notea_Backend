import { Inject, Injectable } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { crearEtiquetaDto } from './dto/crearEtiqueta.dto';
import { Either } from 'src/Utils/Either';
import { Etiqueta } from '../Dominio/AgregadoEtiqueta';
import { RepositorioEtiqueta } from '../Dominio/RepositorioEtiqueta';
import { repositorioEtiquetaImp } from '../Infraestructura/repository/RepositorioEtiquetaImp';


@Injectable()
export class crearEtiquetaService
  implements IAplicationService<crearEtiquetaDto, Etiqueta>
{
  private readonly repositorioEtiqueta: RepositorioEtiqueta;
  constructor(
    @Inject(repositorioEtiquetaImp)
    repositorioEtiqueta: RepositorioEtiqueta,
  ) {
    this.repositorioEtiqueta = repositorioEtiqueta;
  }

  async execute(s: crearEtiquetaDto): Promise<Either<Etiqueta, Error>> {
    
    const etiqueta = Etiqueta.crearEtiqueta(s.nombre, s.color, s.idUsuario);

    return await this.repositorioEtiqueta.crearEtiqueta(etiqueta);
  }
}
