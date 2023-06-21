import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { Either } from 'src/Utils/Either';
import { EditarUsuarioPO } from '../Aplicacion/dto/editarUsuarioPO';
import { loguearUsuarioDTO } from '../Aplicacion/dto/LoguearUsuario.dto';

export interface RepositorioUsuario {
  //Arreglar lo que devuelve cada metodo
  save(usuario: Usuario): void;
  crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>>;
  editarUsuario(usuario: EditarUsuarioPO): Promise<Either<Usuario, Error>>;
  eliminarUsuario(id: string): Promise<Either<string, Error>>;
  buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>>;
  buscarUsuario(email: string): Promise<Either<Usuario, Error>>;
  buscarUsuarioId(id: string): Promise<Either<Usuario, Error>>;
  loguearUsuario(s: loguearUsuarioDTO): Promise<Either<Usuario, Error>>;
}
