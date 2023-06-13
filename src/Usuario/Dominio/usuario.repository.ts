import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';
import { Either } from '../utils/either';

export interface UsuarioRepository {
  //Arreglar lo que devuelve cada metodo
  save(usuario: Usuario): void;
  crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>>;
  editarUsuario(usuario: Usuario): void;
  eliminarUsuario(id: string): Promise<Either<string, Error>>;
  buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>>;
  buscarUsuario(email: string): Promise<Either<Usuario, Error>>;
  buscarUsuarioId(id: string): Promise<Either<Usuario, Error>>;
}
