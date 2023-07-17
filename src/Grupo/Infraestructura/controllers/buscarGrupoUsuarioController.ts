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
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { buscarGruposDeUsuarioService } from 'src/Grupo/Aplicacion/buscarGruposDeUsuarioService';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';

@Controller('grupo')
export class buscarGrupoUsuarioController {
  constructor(
    private buscarGrupoPorUsuario: buscarGruposDeUsuarioService,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
  ) {
    this.logger = new ILoggerImplementation();
    this.buscarGrupoPorUsuario = new buscarGruposDeUsuarioService(
      this.repositorioGrupo,
    );
  }

  @Get('/usuario/:idUsuarioDueno')
  async buscarGruposUsuario(
    @Res() response,
    @Param('idUsuarioDueno') id: string,
  ) {
    const decorator = new LoggerService<string, Iterable<Grupo>>(
      this.logger,
      this.buscarGrupoPorUsuario,
      'Buscar grupos por usuario service: se han buscado los grupos del usuario: ' +
        id,
    );

    const respuesta = await decorator.execute(id);

    if (respuesta.isLeft()) {
      return response.status(200).json(respuesta.getLeft());
    } else {
      return response.status(404).json(respuesta.getRight().message);
    }
  }
}
