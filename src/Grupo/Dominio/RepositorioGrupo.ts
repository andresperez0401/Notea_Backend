import { Grupo } from './AgregadoGrupo';
import { Either } from 'src/Utils/Uither';

export interface RepositorioGrupo{
  //Arreglar lo que devuelve cada metodo
  //save(grupo: Grupo): void;
  creargrupo(grupo: Grupo): Promise<Either<Grupo, Error>>;
 // editarGrupo(grupo: EditarGrupoPO): Promise<Either<Grupo, Error>>;
  //eliminarGrupo(id: string): Promise<Either<string, Error>>;
   buscarGrupos(): Promise<Either<Iterable<Grupo>, Error>>;
 // buscarGrupo(id: string): Promise<Either<Grupo, Error>>;
}