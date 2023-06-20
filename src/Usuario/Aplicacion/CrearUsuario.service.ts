import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Inject } from '@nestjs/common';
import { Either } from 'src/Utils/Either';
import { CrearUsuarioDto } from './dto/CrearUsuario.dto';
import { Usuario } from '../Dominio/AgregadoUsuario';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';

export class CrearUsuarioService
  implements IAplicationService<CrearUsuarioDto, Usuario>
{
  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(
    @Inject('RepositorioUsuario')
    repositorioUsuario: RepositorioUsuario,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: CrearUsuarioDto): Promise<Either<Usuario, Error>> {
    const newUser: Usuario = Usuario.crearUsuario(
      s.nombre,
      s.apellido,
      s.email,
      s.clave,
      s.suscripcion,
    );

    return await this.repositorioUsuario.crearUsuario(newUser);
  }
}
