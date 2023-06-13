/* eslint-disable @typescript-eslint/no-empty-function */
import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { User } from '../entities/usuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/Usuario/Dominio/usuario.repository';
import { Either } from 'src/Usuario/utils/either';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';
import { nombreUsuario } from 'src/Usuario/Dominio/value_objects/nombreUsuario';
import { apellidoUsuario } from 'src/Usuario/Dominio/value_objects/apellidoUsuario';
import { idUsuario } from 'src/Usuario/Dominio/value_objects/idUsuario';
import { claveUsuario } from 'src/Usuario/Dominio/value_objects/claveUsuario';

// eslint-disable-next-line prettier/prettier
export class UsuarioRepositoryImpl implements UsuarioRepository{ //implements UsuarioRepository { por alguna razon al implementar la interfaz me da error
  constructor(
    @InjectRepository(User)
    private readonly usuarioRepo: Repository<User>,
  ) {}

  //metodo que hace post de un usuario
  async crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>> {
    const userEntidad = new User();
    userEntidad.id = usuario.getId();
    userEntidad.nombre = usuario.getNombre();
    userEntidad.apellido = usuario.getApellido();
    userEntidad.email = usuario.getEmail();
    userEntidad.clave = usuario.getClave();
    userEntidad.suscripcion = usuario.isSuscribed();

    try {
      await this.usuarioRepo.save(userEntidad);
      return Either.makeLeft(usuario);
    } catch (error) {
      return Either.makeRight(error);
    }
  }

  //metodo que busca todos los usuarios que se encuentran registrados
  async buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>> {
    try {
      const respuesta: User[] = await this.usuarioRepo.find();
      const usuarios: Usuario[] = respuesta.map((user) =>
        //transformamos el iterable de user(entity) a usuario (dominio)
        Usuario.crearUsuario(
          new nombreUsuario(user.nombre),
          new apellidoUsuario(user.apellido),
          new emailUsuario(user.email),
          new claveUsuario(user.clave),
          user.suscripcion,
          new idUsuario(user.id),
        ),
      );

      return Either.makeLeft(usuarios);
    } catch (error) {
      return Either.makeRight(error);
    }
  }

  //Buscar usuario por email (es unico)
  async buscarUsuario(email: string): Promise<Either<Usuario, Error>> {
    try {
      const respuesta: User = await this.usuarioRepo.findOne({
        where: { email },
      });
      const newUser: Usuario = Usuario.crearUsuario(
        new nombreUsuario(respuesta.nombre),
        new apellidoUsuario(respuesta.apellido),
        new emailUsuario(respuesta.email),
        new claveUsuario(respuesta.clave),
        respuesta.suscripcion,
        new idUsuario(respuesta.id),
      );

      return Either.makeLeft(newUser);
    } catch (error) {
      return Either.makeRight(error);
    }
  }

  //Buscar usuario por id
  async buscarUsuarioId(id: string): Promise<Either<Usuario, Error>> {
    try {
      const respuesta: User = await this.usuarioRepo.findOne({
        where: { id },
      });
      const newUser: Usuario = Usuario.crearUsuario(
        new nombreUsuario(respuesta.nombre),
        new apellidoUsuario(respuesta.apellido),
        new emailUsuario(respuesta.email),
        new claveUsuario(respuesta.clave),
        respuesta.suscripcion,
        new idUsuario(respuesta.id),
      );

      return Either.makeLeft(newUser);
    } catch (error) {
      return Either.makeRight(error);
    }
  }

  editarUsuario(usuario: Usuario): void {}

  async eliminarUsuario(id: string): Promise<Either<string, Error>> {
    try {
      const usuarioAEliminar: User = await this.usuarioRepo.findOne({
        where: { id },
      });
      await this.usuarioRepo.delete(usuarioAEliminar);
      return Either.makeLeft(`Usuario de id #${id} ha sido eliminado`);
    } catch (error) {
      return Either.makeRight(error);
    }
    return undefined;
  }

  save(usuario: Usuario): void {}
}
