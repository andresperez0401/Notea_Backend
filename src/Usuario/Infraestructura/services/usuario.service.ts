import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUsuarioDto } from '../dto/usuario.dto';
import { Usuario } from '../entities/usuario';
import { UsuarioRepositoryImpl } from '../repository/usuarioRepositoryImpl';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    private readonly usuarioRepository: UsuarioRepositoryImpl,
  ) {}

  //Creacion de usuario
  async createUsuario(data: CreateUsuarioDto) {
    const newUsuario = this.usuarioRepo.create(data);
    await this.usuarioRepository.crearUsuario(newUsuario);
    return this.usuarioRepo.save(newUsuario);
  }
  //Buscar usuarios
  //Buscar un usuario
  //Actualizar un usuario
  //Eliminar un usuario
}
