import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUsuarioDto } from '../dto/usuario.dto';
import { Usuario } from '../entities/usuario';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}
  createUsuario(data: CreateUsuarioDto) {
    const newUsuario = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(newUsuario);
  }
}
