import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable, Inject } from '@nestjs/common';
import { Either } from 'src/utils/either';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';

@Injectable()
export class EliminarUsuarioService
  implements IAplicationService<null, string>
{
  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(
    @Inject('RepositorioUsuario')
    repositorioUsuario: RepositorioUsuario,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: string): Promise<Either<string, Error>> {
    return await this.repositorioUsuario.eliminarUsuario(s);
  }
}
