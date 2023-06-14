import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Injectable, Inject } from '@nestjs/common';
import { Either } from 'src/utils/either';
import { CreateUsuarioDto } from './dto/usuario.dto';
import { Usuario } from '../Dominio/Usuario';
import { UsuarioRepository } from '../Dominio/usuario.repository';
import { nombreUsuario } from '../Dominio/value_objects/nombreUsuario';
import { apellidoUsuario } from '../Dominio/value_objects/apellidoUsuario';
import { emailUsuario } from '../Dominio/value_objects/emailUsuario';
import { claveUsuario } from '../Dominio/value_objects/claveUsuario';
import { UsuarioRepositoryImpl } from '../Infraestructura/repository/usuarioRepositoryImpl';

@Injectable()
export class findByEmailService implements IAplicationService<string, Usuario> {
  private readonly repositorioUsuario: UsuarioRepository;

  constructor(
    @Inject(UsuarioRepositoryImpl)
    repositorioUsuario: UsuarioRepository,
  ) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: string): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.buscarUsuario(s);
  }
}
