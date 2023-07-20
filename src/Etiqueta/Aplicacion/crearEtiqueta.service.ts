import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { crearEtiquetaDto } from './dto/crearEtiqueta.dto';
import { Either } from 'src/Utils/Either';
import { Etiqueta } from '../Dominio/AgregadoEtiqueta';
import { RepositorioEtiqueta } from '../Dominio/RepositorioEtiqueta';
import { colorEtiqueta } from '../Dominio/ValueObjectsEtiqueta/colorEtiqueta';

export class crearEtiquetaService
  implements IAplicationService<crearEtiquetaDto, Etiqueta>
{
  private readonly repositorioEtiqueta: RepositorioEtiqueta;
  constructor(repositorioEtiqueta: RepositorioEtiqueta) {
    this.repositorioEtiqueta = repositorioEtiqueta;
  }

  async execute(s: crearEtiquetaDto): Promise<Either<Etiqueta, Error>> {
    if (Object.values(colorEtiqueta).includes(s.color)) {
      // esto deberia ser verificado por el VO
      const etiqueta = Etiqueta.crearEtiqueta(s.nombre, s.color, s.idUsuario);
      return await this.repositorioEtiqueta.crearEtiqueta(etiqueta);
    } else {
      return Either.makeRight<Etiqueta, Error>(
        new Error('El color de la etiqueta no es valido'),
      );
    }
  }
}
