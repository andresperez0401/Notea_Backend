import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';

export class EliminarUsuarioService
  implements IAplicationService<string, string>
{
  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(
    repositorioUsuario: RepositorioUsuario,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: string): Promise<Either<string, Error>> {
    return await this.repositorioUsuario.eliminarUsuario(s);
  }
}
