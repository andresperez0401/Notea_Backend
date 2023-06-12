import { Usuario } from '../entities/usuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/core/domain/repository/usuarioRepository';

// eslint-disable-next-line prettier/prettier
export class UsuarioRepositoryImpl { //implements UsuarioRepository { por alguna razon al implementar la interfaz me da error
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async crearUsuario(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepo.save(usuario);
  }
}
