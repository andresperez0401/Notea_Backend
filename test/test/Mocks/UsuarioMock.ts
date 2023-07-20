/* eslint-disable prettier/prettier */
import { loguearUsuarioDTO } from 'src/Usuario/Aplicacion/dto/LoguearUsuario.dto';
import { EditarUsuarioPO } from 'src/Usuario/Aplicacion/dto/editarUsuarioPO';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { RepositorioUsuario } from 'src/Usuario/Dominio/RepositorioUsuario';
import { Either } from 'src/Utils/Either';

export class MockRepositorioUsuario implements RepositorioUsuario {
  save(usuario: Usuario): void {
    throw new Error('Method not implemented.');
  }
  crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>> {
    throw new Error('Method not implemented.');
  }
  async editarUsuario(usuario: EditarUsuarioPO): Promise<Either<Usuario, Error>> {
    if(usuario.id != 'c87eb4cb-0d04-49de-8aec-df4abe9c345b'){
      return Either.makeRight<Usuario, Error>(new Error('Usuario no encontrado'));
    }else if (!usuario.payload.nombre && !usuario.payload.apellido && !usuario.payload.email && !usuario.payload.clave && !usuario.payload.suscripcion){
      return Either.makeRight<Usuario, Error>(new Error('No hay nada que editar'));
    }
    const user = Usuario.crearUsuario(usuario.payload.nombre, usuario.payload.apellido, usuario.payload.email, usuario.payload.clave, usuario.payload.suscripcion);
    return Either.makeLeft<Usuario, Error>(user);
  }
  eliminarUsuario(id: string): Promise<Either<string, Error>> {
    throw new Error('Method not implemented.');
  }
  buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>> {
    throw new Error('Method not implemented.');
  }
  buscarUsuario(email: string): Promise<Either<Usuario, Error>> {
    throw new Error('Method not implemented.');
  }
  buscarUsuarioId(id: string): Promise<Either<Usuario, Error>> {
    throw new Error('Method not implemented.');
  }
  loguearUsuario(s: loguearUsuarioDTO): Promise<Either<Usuario, Error>> {
    throw new Error('Method not implemented.');
  }
}
