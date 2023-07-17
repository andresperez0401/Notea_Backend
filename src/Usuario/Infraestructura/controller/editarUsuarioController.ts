import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Res,
    Response,
  } from '@nestjs/common';

import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { UpdateUsuarioDto } from 'src/Usuario/Aplicacion/dto/CrearUsuario.dto';
import { EditarUsuarioPO } from '../../Aplicacion/dto/editarUsuarioPO';
import { EditarUsuarioService } from 'src/Usuario/Aplicacion/EditarUsuario.service';
import { RepositorioUsuarioImp } from '../repository/RepositorioUsuarioImp';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { ILogger } from 'src/Decorators/Aplicacion/ILogger';
import { RepositorioUsuario } from 'src/Usuario/Dominio/RepositorioUsuario';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { EventPublisher } from '@nestjs/cqrs';


@Controller('usuario')
export class editarUsuarioController {
  constructor(
    private repositorio: RepositorioUsuarioImp,
    private editarUsuarioService: EditarUsuarioService,
    private logger: ILoggerImplementation,

    ) {
   
    this.logger = new ILoggerImplementation();
    this.editarUsuarioService = new EditarUsuarioService(this.repositorio);
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
    const decorator = new LoggerService<EditarUsuarioPO,Usuario>(this.logger,this.editarUsuarioService,"Editar Usuario Service: El usuario: " + payload.nombre + " ha sido editado con exito");
    const respuesta = await decorator.execute(editarPO);

    if(respuesta.isLeft()){
      return response.status(200).json(respuesta.getLeft());
    }
    else{
      return response.status(404).json(respuesta.getRight().message);
    }
  }
}