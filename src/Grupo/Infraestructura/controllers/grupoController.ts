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
  
  @Controller('grupo')
  export class GrupoController {
    constructor(
      private readonly crearGrupoService: CrearGrupoService,
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
  
   /* //buscar todos los usuarios
    @Get('/all')
    async buscarUsuarios(@Res() response) {
      const respuesta = await this.buscarUsuariosService.execute();
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
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
  