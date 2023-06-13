
import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { User } from '../entities/usuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/Usuario/Dominio/usuario.repository';
import { Either } from 'src/Usuario/utils/either';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';

// eslint-disable-next-line prettier/prettier
export class UsuarioRepositoryImpl implements UsuarioRepository{ //implements UsuarioRepository { por alguna razon al implementar la interfaz me da error
  constructor(
    @InjectRepository(User)
    private readonly usuarioRepo: Repository<User>,
  ) {}

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

 /* async buscarUsuarios(): Promise<Iterable<Usuario>> {
    return await this.usuarioRepo.find();
  }*/

  /*async buscarUsuarios(): Promise<Either<Iterable<Usuario>,Error>> {
    try {
     const respuesta: User []=  await this.usuarioRepo.find();
     
     const usuarios: Usuario[] = respuesta.map((user) => Usuario.crearUsuario(user));

     return Either.makeLeft(respuesta);
    
    } catch (error) {
      return Either.makeRight(error);
    }
  }*/

  buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>> {
    return;
  }

  editarUsuario(usuario: Usuario):void {

  };
  eliminarUsuario(usuario: Usuario): void{

  };
  buscarUsuario(email: emailUsuario): void{

  };
  save(usuario: Usuario): void {
    
  }

  

  
}
