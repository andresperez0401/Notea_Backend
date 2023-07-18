/* eslint-disable @typescript-eslint/no-empty-function */
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { EntidadUsuario } from '../entities/EntidadUsuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositorioUsuario } from 'src/Usuario/Dominio/RepositorioUsuario';
import { Either } from 'src/Utils/Either';
import { EditarUsuarioPO } from '../../Aplicacion/dto/editarUsuarioPO';
import { loguearUsuarioDTO } from 'src/Usuario/Aplicacion/dto/LoguearUsuario.dto';

import { EventPublisher } from 'src/core/domain/events/EventPublisher';
import { Inject } from '@nestjs/common';

export class RepositorioUsuarioImp implements RepositorioUsuario {
  constructor(
    @InjectRepository(EntidadUsuario)
    private readonly usuarioRepo: Repository<EntidadUsuario>,
    @Inject('EventPublisher')
    private readonly eventPublisher: EventPublisher,
  ) {
    this.eventPublisher = eventPublisher;
  }

  //metodo que hace post de un usuario
  async crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>> {
    const userEntidad = new EntidadUsuario();
    userEntidad.id = usuario.getId();
    userEntidad.nombre = usuario.getNombre();
    userEntidad.apellido = usuario.getApellido();
    userEntidad.email = usuario.getEmail();
    userEntidad.clave = usuario.getClave();
    userEntidad.suscripcion = usuario.getSuscripcion();
    const respuesta = await this.usuarioRepo.save(userEntidad);

    if (respuesta) {
      return Either.makeLeft<Usuario, Error>(usuario);
    } else {
      return Either.makeRight<Usuario, Error>(
        new Error('No se pudo guardar el usuario'),
      );
    }
  }

  //metodo que busca todos los usuarios que se encuentran registrados
  async buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>> {
    const respuesta: EntidadUsuario[] = await this.usuarioRepo.find();

    if (respuesta) {
      const usuarios: Usuario[] = respuesta.map((user) =>
        //transformamos el iterable de user(entity) a usuario (dominio)
        Usuario.crearUsuario(
          user.nombre,
          user.apellido,
          user.email,
          user.clave,
          user.suscripcion,
          user.id,
        ),
      );
      return Either.makeLeft<Iterable<Usuario>, Error>(usuarios);
    } else {
      return Either.makeRight<Iterable<Usuario>, Error>(
        new Error('Error al obtener usuarios'),
      );
    }
  }

  //Buscar usuario por email (es unico)
  async buscarUsuario(email: string): Promise<Either<Usuario, Error>> {
    const respuesta: EntidadUsuario = await this.usuarioRepo.findOne({
      where: { email: email },
    });
    if (respuesta) {
      const newUser: Usuario = Usuario.crearUsuario(
        respuesta.nombre,
        respuesta.apellido,
        respuesta.email,
        respuesta.clave,
        respuesta.suscripcion,
        respuesta.id,
      );
      return Either.makeLeft<Usuario, Error>(newUser);
    } else {
      return Either.makeRight<Usuario, Error>(
        new Error('Usuario no encontrado'),
      );
    }
  }

  //Buscar usuario por id
  async buscarUsuarioId(id: string): Promise<Either<Usuario, Error>> {
    const respuesta: EntidadUsuario = await this.usuarioRepo.findOne({
      where: { id },
    });
    if (respuesta) {
      const newUser: Usuario = Usuario.crearUsuario(
        respuesta.nombre,
        respuesta.apellido,
        respuesta.email,
        respuesta.clave,
        respuesta.suscripcion,
        respuesta.id,
      );
      return Either.makeLeft<Usuario, Error>(newUser);
    } else {
      return Either.makeRight<Usuario, Error>(
        new Error('Usuario no encontrado'),
      );
    }
  }

  async editarUsuario(info: EditarUsuarioPO): Promise<Either<Usuario, Error>> {
    let encontro: boolean;
    const usuario = await this.usuarioRepo.findOneBy({ id: info.id });

    if (usuario) {
      await this.usuarioRepo.merge(usuario, info.payload);
      const resultado = await this.usuarioRepo.save(usuario);
      if (resultado) {
        const usuarioEditado: Usuario = Usuario.crearUsuario(
          usuario.nombre,
          usuario.apellido,
          usuario.email,
          usuario.clave,
          usuario.suscripcion,
          usuario.id,
        );
        return Either.makeLeft<Usuario, Error>(usuarioEditado);
      } else {
        return Either.makeRight<Usuario, Error>(
          new Error('Error al editar usuario'),
        );
      }
    } else {
      return Either.makeRight<Usuario, Error>(
        new Error('No se encontro usuario con id' + info.id),
      );
    }
  }

  async eliminarUsuario(id: string): Promise<Either<string, Error>> {
    const usuarioAEliminar: EntidadUsuario = await this.usuarioRepo.findOne({
      where: { id },
    });
    if (usuarioAEliminar) {
      //primero validamos que el id proporcionado exista
      const resultado = await this.usuarioRepo.delete(usuarioAEliminar);
      if (resultado) {
        return Either.makeLeft<string, Error>(
          `Usuario de id #${id} ha sido eliminado`,
        );
      } else {
        return Either.makeRight<string, Error>(
          new Error('Error al eliminar usuario'),
        );
      }
    } else {
      return Either.makeRight<string, Error>(
        new Error('No se encontro usuario para eliminar'),
      );
    }
  }

  async loguearUsuario(s: loguearUsuarioDTO): Promise<Either<Usuario, Error>> {
    const usuario = await this.usuarioRepo.findOne({
      where: { email: s.email },
    });
    if (usuario) {
      if (usuario.clave === s.clave) {
        const usuarioLogueado: Usuario = Usuario.crearUsuario(
          usuario.nombre,
          usuario.apellido,
          usuario.email,
          usuario.clave,
          usuario.suscripcion,
          usuario.id,
        );
        return Either.makeLeft<Usuario, Error>(usuarioLogueado);
      } else {
        return Either.makeRight<Usuario, Error>(new Error('Clave incorrecta'));
      }
    } else {
      return Either.makeRight<Usuario, Error>(
        new Error('Usuario no encontrado'),
      );
    }
  }

  save(usuario: Usuario): void {}
}
