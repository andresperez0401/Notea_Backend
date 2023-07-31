import { Either } from 'src/Utils/Either';
import { Etiqueta } from './AgregadoEtiqueta';
import { actualizarEtiquetaDto } from '../Aplicacion/dto/actualizarEtiqueta.dto';

export interface RepositorioEtiqueta {
  crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Etiqueta, Error>>;
  actualizarEtiqueta(etiqueta: actualizarEtiquetaDto): Promise<Either<string, Error>>;
  buscarEtiquetas(idUsuario: string): Promise<Either<Iterable<Etiqueta>, Error>>;
}
