import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { CreateUsuarioDto } from '../dto/usuario.dto';
import { crearUsuarioService } from 'src/Usuario/Aplicacion/crearUsuarioService';
import { getAllUsersService } from 'src/Usuario/Aplicacion/getAllUsersService';
import { findByEmailService } from 'src/Usuario/Aplicacion/findByEmailService';
import { findByIdService } from 'src/Usuario/Aplicacion/findByIdService';
import { eliminarUsuarioService } from 'src/Usuario/Aplicacion/eliminarUsuarioService';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: crearUsuarioService,
    private readonly findAllService: getAllUsersService,
    private readonly findByEmailService: findByEmailService,
    private readonly findByIdService: findByIdService,
    private readonly eliminarUsuarioService: eliminarUsuarioService,
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
  createUsuario(@Body() payload: CreateUsuarioDto) {
    return this.usuarioService.execute(payload);
  }

  //buscar todos los usuarios
  @Get()
  findAll() {
    return this.findAllService.execute(null);
  }
  //Buscar por email
  @Get('email/:email')
  async buscarUsuarioPorEmail(@Param('email') email: string) {
    return await this.findByEmailService.execute(email);
  }
  //Buscar por id
  @Get('id/:id')
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.findByIdService.execute(id);
  }
  //Eliminar usuario
  @Delete(':id')
  async eliminarUsuario(@Param('id') id: string) {
    return await this.eliminarUsuarioService.execute(id);
  }
}
