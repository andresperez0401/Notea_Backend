import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable, Inject } from '@nestjs/common';
import { Either } from 'src/utils/either';
import { Usuario } from '../Dominio/Usuario';
import { UsuarioRepository } from '../Dominio/usuario.repository';
import { UsuarioRepositoryImpl } from '../Infraestructura/repository/usuarioRepositoryImpl';

@Injectable()
export class eliminarUsuarioService
  implements IAplicationService<null, string>
{
  private readonly repositorioUsuario: UsuarioRepository;

  constructor(
    @Inject(UsuarioRepositoryImpl)
    repositorioUsuario: UsuarioRepository,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: string): Promise<Either<string, Error>> {
    return await this.repositorioUsuario.eliminarUsuario(s);
  }
}
