import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { CreateUsuarioDto } from '../dto/usuario.dto';
import { Usuario } from 'src/Usuario/Dominio/Usuario';
import { crearUsuarioService } from 'src/Usuario/Aplicacion/crearUsuarioService';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: crearUsuarioService) {}

  private counterId = 1;
  private users = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];
  /*//Crear usuario
  @Post()
  createUsuario(@Body() payload: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(payload);
  }*/

  @Post()
  createUsuario(@Body() payload: CreateUsuarioDto){
    return this.usuarioService.execute(payload);
  }

  //buscar todos los usuarios
  /*@Get()
  findAll(): Promise<Iterable<Usuario>>{
    return this.usuarioService.getAllUsuarios();
  }*/
}
