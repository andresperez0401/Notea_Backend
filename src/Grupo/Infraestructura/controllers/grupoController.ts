/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    Response,
  } from '@nestjs/common';
  
  import { Grupo } from 'src/Grupo/Dominio/AgregadoGrupo';
  import { CrearGrupoService } from 'src/Grupo/Aplicacion/crearGrupoService';
  import { CrearGrupoDto } from 'src/Grupo/Aplicacion/dto/CrearGrupo.dto';
  import { buscarGruposService } from 'src/Grupo/Aplicacion/buscarGruposService';
  
  @Controller('grupo')
  export class GrupoController {
    constructor(
      private readonly crearGrupoService: CrearGrupoService,
      private readonly buscarGruposService: buscarGruposService,
    ) {}
  
    @Post()
    async crearGrupo(@Res() response, @Body() payload: CrearGrupoDto) {
      const respuesta = await this.crearGrupoService.execute(payload);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
  
    //buscar todos los grupos
    @Get('/all')
    async buscarGrupos(@Res() response) {
      const respuesta = await this.buscarGruposService.execute();
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
    /*
    //Buscar por email
    @Get('email/:email')
    async buscarUsuarioPorEmail(@Res() response, @Param('email') email: string) {
      const respuesta = await this.buscarUsuariosEmailService.execute(email)
    
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
    //Buscar por id
    @Get('id/:id')
    async buscarUsuarioPorId(@Res() response, @Param('id') id: string) {
      const respuesta = await this.buscarUsuariosIdService.execute(id);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
    //Eliminar usuario
    @Delete(':id')
    async eliminarUsuario(@Res() response, @Param('id') id: string) {
      const respuesta = await this.eliminarUsuarioService.execute(id);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
    //Editar usuario
    @Put(':id')
    async editarUsuario(
      @Res() response,
      @Param('id') id: string,
      @Body() payload: UpdateUsuarioDto,
    ) {
      const editarPO = new EditarUsuarioPO();
      editarPO.id = id;
      editarPO.payload = payload;
      const respuesta = await this.editarUsuarioService.execute(editarPO);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }*/
  }
  