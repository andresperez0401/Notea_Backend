import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Inject } from '@nestjs/common';
import { Either } from 'src/Utils/Either';
import { Usuario } from '../Dominio/AgregadoUsuario';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';
import { loguearUsuarioDTO } from './dto/LoguearUsuario.dto';

export class LoguearUsuarioService
  implements IAplicationService<loguearUsuarioDTO, Usuario>
{
  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(
    @Inject('RepositorioUsuario')
    repositorioUsuario: RepositorioUsuario,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: loguearUsuarioDTO): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.loguearUsuario(s);
  }
}
