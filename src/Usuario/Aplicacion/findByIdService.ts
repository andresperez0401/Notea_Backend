import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Either } from '../utils/either';
import { Usuario } from '../Dominio/Usuario';
import { UsuarioRepository } from '../Dominio/usuario.repository';
import { UsuarioRepositoryImpl } from '../Infraestructura/repository/usuarioRepositoryImpl';

@Injectable()
export class findByIdService implements IAplicationService<string, Usuario> {
  private readonly repositorioUsuario: UsuarioRepository;

  constructor(
    @Inject(UsuarioRepositoryImpl)
    repositorioUsuario: UsuarioRepository,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: string): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.buscarUsuarioId(s);
  }
}
