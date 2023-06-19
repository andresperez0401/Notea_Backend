/* eslint-disable @typescript-eslint/no-empty-function */
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { EntidadUsuario } from '../entities/EntidadUsuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositorioUsuario } from 'src/Usuario/Dominio/RepositorioUsuario';
import { Either } from 'src/utils/either';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';
import { nombreUsuario } from 'src/Usuario/Dominio/value_objects/nombreUsuario';
import { apellidoUsuario } from 'src/Usuario/Dominio/value_objects/apellidoUsuario';
import { claveUsuario } from 'src/Usuario/Dominio/value_objects/claveUsuario';
import { EditarUsuarioPO } from '../../Aplicacion/dto/editarUsuarioPO';
import { error } from 'console';

export class RepositorioUsuarioImp implements RepositorioUsuario {
  constructor(
    @InjectRepository(EntidadUsuario)
    private readonly usuarioRepo: Repository<EntidadUsuario>,
  ) {}

  //metodo que hace post de un usuario
  async crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>> {
    const userEntidad = new EntidadUsuario();
    userEntidad.id = usuario.getId();
    userEntidad.nombre = usuario.getNombre();
    userEntidad.apellido = usuario.getApellido();
    userEntidad.email = usuario.getEmail();
    userEntidad.clave = usuario.getClave();
    userEntidad.suscripcion = usuario.isSuscribed();

    const respuesta = await this.usuarioRepo.save(userEntidad);
      
    if(respuesta){
      return Either.makeLeft<Usuario,Error>(usuario);
    }
    else{
      return Either.makeRight<Usuario,Error>(new Error('No se pudo guardar el usuario'));
    }
  }

  //metodo que busca todos los usuarios que se encuentran registrados
  async buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>> {
   
      const respuesta: EntidadUsuario[] = await this.usuarioRepo.find();
     
      if(respuesta){
        const usuarios: Usuario[] = respuesta.map((user) =>
        //transformamos el iterable de user(entity) a usuario (dominio)
        Usuario.crearUsuario(
          new nombreUsuario(user.nombre),
          new apellidoUsuario(user.apellido),
          new emailUsuario(user.email),
          new claveUsuario(user.clave),
          user.suscripcion,
          user.id,
        ),
      );
        return Either.makeLeft<Iterable<Usuario>, Error>(usuarios);
      }
      else{
        return Either.makeRight<Iterable<Usuario>,Error>(new Error ('Error al obtener usuarios'));
      }
  }

  //Buscar usuario por email (es unico)
  async buscarUsuario(email: string): Promise<Either<Usuario, Error>> {
    
      const respuesta: EntidadUsuario = await this.usuarioRepo.findOne({
        where: { email },
      });
      if(respuesta){
        const newUser: Usuario = Usuario.crearUsuario(
          new nombreUsuario(respuesta.nombre),
          new apellidoUsuario(respuesta.apellido),
          new emailUsuario(respuesta.email),
          new claveUsuario(respuesta.clave),
          respuesta.suscripcion,
          respuesta.id,
        );

        return Either.makeLeft<Usuario,Error>(newUser);
      }
      else{
        return Either.makeRight<Usuario,Error>(new Error('Usuario no encontrado'));
      }
  }

  //Buscar usuario por id
  async buscarUsuarioId(id: string): Promise<Either<Usuario, Error>> {
   
      const respuesta: EntidadUsuario = await this.usuarioRepo.findOne({
        where: { id },
      });
      if (respuesta){
        const newUser: Usuario = Usuario.crearUsuario(
          new nombreUsuario(respuesta.nombre),
          new apellidoUsuario(respuesta.apellido),
          new emailUsuario(respuesta.email),
          new claveUsuario(respuesta.clave),
          respuesta.suscripcion,
          respuesta.id,
        );
        return Either.makeLeft<Usuario,Error>(newUser);
      }
      else{
        return Either.makeRight<Usuario,Error>(new Error('Usuario no encontrado')); 
      }
  }

  async editarUsuario(info: EditarUsuarioPO): Promise<Either<Usuario, Error>> {
      const usuario = await this.usuarioRepo.findOneBy({ id: info.id });
      await this.usuarioRepo.merge(usuario, info.payload);
      const resultado =  await this.usuarioRepo.save(usuario);
      
      if(resultado){
        const usuarioEditado: Usuario = Usuario.crearUsuario(
          new nombreUsuario(usuario.nombre),
          new apellidoUsuario(usuario.apellido),
          new emailUsuario(usuario.email),
          new claveUsuario(usuario.clave),
          usuario.suscripcion,
          usuario.id,
        );
        return Either.makeLeft<Usuario,Error>(usuarioEditado);
      }
      else{   
        return Either.makeRight<Usuario,Error>(new Error('Error al editar usuario'));
      }
  }

  async eliminarUsuario(id: string): Promise<Either<string, Error>> {
    const usuarioAEliminar: EntidadUsuario = await this.usuarioRepo.findOne({
        where: { id },
    });
  
    const resultado =  await this.usuarioRepo.delete(usuarioAEliminar);
    if(resultado){
      return Either.makeLeft<string,Error> (`Usuario de id #${id} ha sido eliminado`);
    }
    else{
      return Either.makeRight<string,Error>(new Error('Error al eliminar usuario'));
    }
  }

  save(usuario: Usuario): void {}
}
