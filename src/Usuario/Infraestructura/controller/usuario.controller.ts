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
import { getAllUsersService } from 'src/Usuario/Aplicacion/getAllUsersService';
import { findByEmailService } from 'src/Usuario/Aplicacion/findByEmailService';
import { Either } from 'src/Usuario/utils/either';
import { idUsuario } from 'src/Usuario/Dominio/value_objects/idUsuario';
import { emailUsuario } from 'src/Usuario/Dominio/value_objects/emailUsuario';
import { nombreUsuario } from 'src/Usuario/Dominio/value_objects/nombreUsuario';
import { apellidoUsuario } from 'src/Usuario/Dominio/value_objects/apellidoUsuario';
import { claveUsuario } from 'src/Usuario/Dominio/value_objects/claveUsuario';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: crearUsuarioService,
    private readonly findAllService: getAllUsersService,
    private readonly findByEmailService : findByEmailService,
    ) {}

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
  @Get()
  findAll(){
     return this.findAllService.execute(null);
  }

  @Get(':email')
  async buscarUsuarioPorId(@Param('email') email: string) {
    return await this.findByEmailService.execute(email);
  }
}
