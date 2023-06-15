import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable, Inject } from '@nestjs/common';
import { Either } from 'src/utils/either';
import { Usuario } from '../Dominio/AgregadoUsuario';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';
import { RepositorioUsuarioImp } from '../Infraestructura/repository/RepositorioUsuarioImp';

@Injectable()
export class EncontrarPorEmailService
  implements IAplicationService<string, Usuario>
{
  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(
    @Inject(RepositorioUsuarioImp)
    repositorioUsuario: RepositorioUsuario,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: string): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.buscarUsuario(s);
  }
}
