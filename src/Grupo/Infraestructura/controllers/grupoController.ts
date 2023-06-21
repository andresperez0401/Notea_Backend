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
  import { eliminarGrupoService } from 'src/Grupo/Aplicacion/eliminarGrupoService';
  
  @Controller('grupo')
  export class GrupoController {
    constructor(
      private readonly crearGrupoService: CrearGrupoService,
      private readonly buscarGruposService: buscarGruposService,
      private readonly eliminarGrupoService: eliminarGrupoService,
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

    //Eliminar grupo
    @Delete(':id')
    async eliminarGrupo(@Res() response, @Param('id') id: string) {
      const respuesta = await this.eliminarGrupoService.execute(id);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
    /*
    //Buscar por id
    @Get('id/:id')
    async buscarGrupoPorId(@Res() response, @Param('id') id: string) {
      const respuesta = await this.buscarGruposIdService.execute(id);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }
    //Editar Grupo
    @Put(':id')
    async editargrupo(
      @Res() response,
      @Param('id') id: string,
      @Body() payload: UpdateGrupoDto,
    ) {
      const editarPO = new EditarGrupoPO();
      editarPO.id = id;
      editarPO.payload = payload;
      const respuesta = await this.editarGrupoService.execute(editarPO);
  
      if(respuesta.isLeft()){
        return response.status(200).json(respuesta.getLeft());
      }
      else{
        return response.status(404).json(respuesta.getRight().message);
      }
    }*/
  }
  