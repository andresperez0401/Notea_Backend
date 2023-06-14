import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Either } from 'src/utils/either';
import { Usuario } from '../Dominio/AgregadoUsuario';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';
import { RepositorioUsuarioImp } from '../Infraestructura/repository/RepositorioUsuarioImp';
import { EditarUsuarioPO } from './dto/editarUsuarioPO';

@Injectable()
export class EditarUsuarioService
  implements IAplicationService<EditarUsuarioPO, Usuario>
{
  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(
    @Inject(RepositorioUsuarioImp)
    repositorioUsuario: RepositorioUsuario,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: EditarUsuarioPO): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.editarUsuario(s);
  }
}
