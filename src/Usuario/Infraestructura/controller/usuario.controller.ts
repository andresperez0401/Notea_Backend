/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CrearUsuarioDto, UpdateUsuarioDto } from '../../Aplicacion/dto/CrearUsuario.dto';
import { CrearUsuarioService } from 'src/Usuario/Aplicacion/CrearUsuario.service';
import { BuscarUsuariosService } from 'src/Usuario/Aplicacion/BuscarUsuarios.service';
import { EncontrarPorEmailService } from 'src/Usuario/Aplicacion/EncontrarPorEmail.service';
import { EncontrarPorIdService } from 'src/Usuario/Aplicacion/EncontrarPorId.service';
import { EliminarUsuarioService } from 'src/Usuario/Aplicacion/EliminarUsuario.service';
import { EditarUsuarioPO } from '../../Aplicacion/dto/editarUsuarioPO';
import { EditarUsuarioService } from 'src/Usuario/Aplicacion/EditarUsuario.service';
import { RepositorioNotaImp } from 'src/Nota/Infraestructura/repository/RepositorioNotaImp';
import { loguearUsuarioDTO } from 'src/Usuario/Aplicacion/dto/LoguearUsuario.dto';
import { LoguearUsuarioService } from 'src/Usuario/Aplicacion/LoguearUsuario.service';
import { RepositorioUsuario } from 'src/Usuario/Dominio/RepositorioUsuario';
import { EventPublisher } from 'src/core/domain/events/EventPublisher';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: CrearUsuarioService,
    private readonly buscarUsuariosService: BuscarUsuariosService,
    private readonly buscarUsuariosEmailService: EncontrarPorEmailService,
    private readonly buscarUsuariosIdService: EncontrarPorIdService,
    private readonly eliminarUsuarioService: EliminarUsuarioService,
    private readonly editarUsuarioService: EditarUsuarioService,
    @Inject('RepositorioUsuario') private readonly repoUsuario: RepositorioUsuario,
    @Inject('EventPublisher') private readonly eventPublisher: EventPublisher,
  ) {
    this.usuarioService = new CrearUsuarioService(this.repoUsuario,eventPublisher);
  }

  @Post()
  crearUsuario(@Body() payload: CrearUsuarioDto) {
    return this.usuarioService.execute(payload);
  }

  //buscar todos los usuarios
  @Get('/all')
  buscarUsuarios() {
    return this.buscarUsuariosService.execute();
  }
  //Buscar por email
  @Get('email/:email')
  async buscarUsuarioPorEmail(@Param('email') email: string) {
    return await this.buscarUsuariosEmailService.execute(email);
  }
  //Buscar por id
  @Get('id/:id')
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.buscarUsuariosIdService.execute(id);
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
    const editarPO = new EditarUsuarioPO();
    editarPO.id = id;
    editarPO.payload = payload;
    return await this.editarUsuarioService.execute(editarPO);
  }
}
