import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';
import { Either } from 'src/utils/either';
import { editarUsuarioPO } from '../Aplicacion/dto/editarUsuarioPO';


export interface UsuarioRepository {
  //Arreglar lo que devuelve cada metodo
  save(usuario: Usuario): void;
  crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>>;
  editarUsuario(usuario: editarUsuarioPO): Promise<Either<Usuario, Error>>;
  eliminarUsuario(id: string): Promise<Either<string, Error>>;
  buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>>;
  buscarUsuario(email: string): Promise<Either<Usuario, Error>>;
  buscarUsuarioId(id: string): Promise<Either<Usuario, Error>>;
}
