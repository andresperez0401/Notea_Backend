import { Either } from 'src/Utils/Either';
import { Etiqueta } from './AgregadoEtiqueta';

export interface RepositorioEtiqueta {
  crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Etiqueta, Error>>;
  // modificarEtiqueta(id: string): Promise<Either<Etiqueta,Error>>;
  buscarEtiquetas(): Promise<Either<Iterable<Etiqueta>,Error>>;
}
