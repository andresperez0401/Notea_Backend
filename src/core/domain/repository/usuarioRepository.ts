import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';

export interface UsuarioRepository {
  //Arreglar lo que devuelve cada metodo
  save(usuario: Usuario): void;
  crearUsuario(usuario: Usuario): Promise<Usuario>;
  editarUsuario(usuario: Usuario): void;
  eliminarUsuario(usuario: Usuario): void;
  buscarUsuarios(): Promise<Iterable<Usuario>>;
  buscarUsuario(email: emailUsuario): void;
}
