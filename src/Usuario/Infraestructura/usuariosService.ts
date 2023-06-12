import { Injectable } from '@nestjs/common';
import { Usuario } from './user.entity';
import { usuario } from '../Dominio/usuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
  export class usuarioService{

    constructor(
      @InjectRepository(Usuario)
      private userRepository: Repository<Usuario>,
    ){}
    
    async getAllUsers(){
      return this.userRepository.find();
    }
  }
