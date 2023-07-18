import { EditarGrupoDto } from '../Aplicacion/dto/EditarGrupo.dto';
import { GrupoAPapeleraDto } from '../Aplicacion/dto/GrupoAPapelera.dto';
import { Grupo } from './AgregadoGrupo';
import { Either } from 'src/Utils/Either';

export interface RepositorioGrupo {
  creargrupo(grupo: Grupo): Promise<Either<Grupo, Error>>;
  editarGrupo(grupo: EditarGrupoDto): Promise<Either<Grupo, Error>>;
  eliminarGrupo(id: string): Promise<Either<string, Error>>;
  buscarGrupos(): Promise<Either<Iterable<Grupo>, Error>>;
  buscarGrupoPorId(id: string): Promise<Either<Grupo, Error>>;
  grupoAPapelera(grupo: GrupoAPapeleraDto): Promise<Either<Grupo, Error>>;

  buscarGruposDeUsuario(
    idUsuarioDueno: string,
  ): Promise<Either<Iterable<Grupo>, Error>>;
}
