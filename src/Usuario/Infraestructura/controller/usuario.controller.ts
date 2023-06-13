import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/usuario.dto';
import { crearUsuarioService } from 'src/Usuario/Aplicacion/crearUsuarioService';
import { getAllUsersService } from 'src/Usuario/Aplicacion/getAllUsersService';
import { findByEmailService } from 'src/Usuario/Aplicacion/findByEmailService';
import { findByIdService } from 'src/Usuario/Aplicacion/findByIdService';
import { eliminarUsuarioService } from 'src/Usuario/Aplicacion/eliminarUsuarioService';
import path from 'path';
import { editarUsuarioPO } from '../dto/editarUsuarioPO';
import { editarUsuarioService } from 'src/Usuario/Aplicacion/editarUsuarioService';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: crearUsuarioService,
    private readonly findAllService: getAllUsersService,
    private readonly findByEmailService: findByEmailService,
    private readonly findByIdService: findByIdService,
    private readonly eliminarUsuarioService: eliminarUsuarioService,
    private readonly editarUsuarioService: editarUsuarioService,
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
  //Editar usuario
  @Put(':id')
  async editarUsuario(
    @Param('id') id: string,
    @Body() payload: UpdateUsuarioDto,
  ) {
    const editarPO = new editarUsuarioPO();
    editarPO.id = id;
    editarPO.payload = payload;
    return await this.editarUsuarioService.execute(editarPO);
  }
}
