/* eslint-disable prettier/prettier */
import {
    Controller,
  } from '@nestjs/common';
  
  import { Grupo } from 'src/Grupo/Dominio/AgregadoGrupo';
  import { CrearGrupoService } from 'src/Grupo/Aplicacion/crearGrupoService';
  import { CrearGrupoDto, UpdateGrupoDto } from 'src/Grupo/Aplicacion/dto/CrearGrupo.dto';
  import { buscarGruposService } from 'src/Grupo/Aplicacion/buscarGruposService';
  import { eliminarGrupoService } from 'src/Grupo/Aplicacion/eliminarGrupoService';
import { buscarGruposDeUsuarioService } from 'src/Grupo/Aplicacion/buscarGruposDeUsuarioService';
import { EditarGrupoDto } from 'src/Grupo/Aplicacion/dto/EditarGrupo.dto';
import { EditarGrupoService } from 'src/Grupo/Aplicacion/editarGrupoService';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';
import { buscarGrupoPorIdService } from 'src/Grupo/Aplicacion/buscarGrupoPorIdService';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
  
@Controller('grupo')
export class GrupoController {
  constructor(
    private crearGrupoService: CrearGrupoService,
    private buscarGrupoAllService: buscarGruposService,
    private deleteGrupoService: eliminarGrupoService,
    private buscarGrupoPorUsuario: buscarGruposDeUsuarioService,
    private editarGrupoService:EditarGrupoService,
    private buscarPorIdService: buscarGrupoPorIdService,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
  ) {
    this.logger = new ILoggerImplementation();
    this.editarGrupoService = new EditarGrupoService(this.repositorioGrupo);
    this.buscarPorIdService = new buscarGrupoPorIdService(this.repositorioGrupo);
    this.crearGrupoService = new CrearGrupoService(this.repositorioGrupo);
    this.buscarGrupoAllService = new buscarGruposService(this.repositorioGrupo);
    this.deleteGrupoService = new eliminarGrupoService(this.repositorioGrupo);
    this.buscarGrupoPorUsuario = new buscarGruposDeUsuarioService(this.repositorioGrupo);
  }/*

  @Post()
  async crearGrupo(@Res() response, @Body() payload: CrearGrupoDto) {

    const decorator = new LoggerService<CrearGrupoDto,Grupo>(this.logger,this.crearGrupoService,"El grupo: " + payload.nombre + " ha sido creado con exito");
    const respuesta = await decorator.execute(payload);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }*/

  //buscar todos los grupos
 /* @Get('/all')
  async buscarGrupos(@Res() response) {
    const respuesta = await this.buscarGrupoAllService.execute();

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }*/

  //Eliminar grupo
  /*@Delete(':id')
  async eliminarGrupo(@Res() response, @Param('id') id: string) {
    const respuesta = await this.deleteGrupoService.execute(id);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }*/

  /*
  @Get('/usuario/:idUsuarioDueno')
  async buscarGruposUsuario(@Res() response, @Param('idUsuarioDueno') id: string) {
    const respuesta = await this.buscarGrupoPorUsuario.execute(id);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }*/

  /*@Put(':id')
  async editargrupo(
    @Res() response,
    @Param('id') id: string,
    @Body() payload: UpdateGrupoDto,
  ) {
    const editarDto = new EditarGrupoDto();
    editarDto.id = id;
    editarDto.payload = payload;
    const respuesta = await this.editarGrupoService.execute(editarDto);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }*/

  //Buscar por id
 /* @Get('id/:id')
  async buscarGrupoPorId(@Res() response, @Param('id') id: string) {
    const respuesta = await this.buscarPorIdService.execute(id);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }*/
}
