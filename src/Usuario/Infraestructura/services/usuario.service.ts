import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUsuarioDto } from '../dto/usuario.dto';
import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { UsuarioRepositoryImpl } from '../repository/usuarioRepositoryImpl';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    private readonly usuarioRepository: UsuarioRepositoryImpl,
  ) {}

  //Creacion de usuario
  /*async createUsuario(data: CreateUsuarioDto) {
    return this.usuarioRepository.crearUsuario(data);
  }*/
  //Buscar usuarios

 /* async getAllUsuarios() : Promise<Iterable<Usuario>>{
    return await this.usuarioRepository.buscarUsuarios();
  }*/
  //Buscar un usuario

  
  //Actualizar un usuario
  //Eliminar un usuario
}
