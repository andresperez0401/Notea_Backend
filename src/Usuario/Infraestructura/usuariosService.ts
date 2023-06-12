import { Injectable } from '@nestjs/common';
import { _user } from './user.entity';
import { usuario } from '../Dominio/usuario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
  export class usuarioService{

    constructor(
      @InjectRepository(_user)
      private userRepository: Repository<_user>,
    ){}
    
    async getAllUsers(){
      return this.userRepository.find();
    }
  }
