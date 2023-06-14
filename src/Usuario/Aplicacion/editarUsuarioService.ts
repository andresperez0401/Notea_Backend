import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Either } from 'src/utils/either';
import { Usuario } from '../Dominio/Usuario';
import { UsuarioRepository } from '../Dominio/usuario.repository';
import { UsuarioRepositoryImpl } from '../Infraestructura/repository/usuarioRepositoryImpl';
import { UpdateUsuarioDto } from './dto/usuario.dto';
import { editarUsuarioPO } from './dto/editarUsuarioPO';

@Injectable()
export class editarUsuarioService
  implements IAplicationService<editarUsuarioPO, Usuario>
{
  private readonly repositorioUsuario: UsuarioRepository;

  constructor(
    @Inject(UsuarioRepositoryImpl)
    repositorioUsuario: UsuarioRepository,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: editarUsuarioPO): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.editarUsuario(s);
  }
}
