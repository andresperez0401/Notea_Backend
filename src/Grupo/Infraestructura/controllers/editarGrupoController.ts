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
import {UpdateGrupoDto } from 'src/Grupo/Aplicacion/dto/CrearGrupo.dto';
import { EditarGrupoDto } from 'src/Grupo/Aplicacion/dto/EditarGrupo.dto';
import { EditarGrupoService } from 'src/Grupo/Aplicacion/editarGrupoService';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
  
@Controller('grupo')
export class EditarGrupoController {
  constructor(
    private editarGrupoService:EditarGrupoService,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
  ) {
    this.logger = new ILoggerImplementation();
    this.editarGrupoService = new EditarGrupoService(this.repositorioGrupo);
  }


  @Put(':id')
  async editargrupo(
    @Res() response,
    @Param('id') id: string,
    @Body() payload: UpdateGrupoDto,
  ) {
    const editarDto = new EditarGrupoDto();
    editarDto.id = id;
    editarDto.payload = payload;
    const decorator = new LoggerService<EditarGrupoDto,Grupo>(this.logger,this.editarGrupoService,"Editar Grupo Service: El grupo: " + payload.nombre + " ha sido editado con exito");
    
    const respuesta = await decorator.execute(editarDto);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }

}