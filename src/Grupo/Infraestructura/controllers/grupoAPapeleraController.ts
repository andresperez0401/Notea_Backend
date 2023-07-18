import { Body, Controller, Param, Patch, Res } from '@nestjs/common';

import { Grupo } from 'src/Grupo/Dominio/AgregadoGrupo';
import { RepositorioGrupoImp } from '../repository/RepositorioGrupoImpl';
import { buscarGrupoPorIdService } from 'src/Grupo/Aplicacion/buscarGrupoPorIdService';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { GrupoAPapeleraservice } from 'src/Grupo/Aplicacion/grupoAPapeleraService';
import { GrupoAPapeleraDto } from 'src/Grupo/Aplicacion/dto/GrupoAPapelera.dto';

@Controller('grupo')
export class grupoAPapeleraController {
  constructor(
    private grupoApapeleraService: GrupoAPapeleraservice,
    private repositorioGrupo: RepositorioGrupoImp,
    private logger: ILoggerImplementation,
  ) {
    this.logger = new ILoggerImplementation();
    this.grupoApapeleraService = new GrupoAPapeleraservice(
      this.repositorioGrupo,
    );
  }

  @Patch('aPapelera')
  async grupoAPapelera(@Res() response, @Body() grupo: GrupoAPapeleraDto) {
    const decorator = new LoggerService<GrupoAPapeleraDto, Grupo>(
      this.logger,
      this.grupoApapeleraService,
      'GrupoAPapeleraService: Se ha movido hacia papelera la nota: ' + grupo.id,
    );
    const respuesta = await decorator.execute(grupo);

    if (respuesta.isLeft()) {
      return response.status(200).json(respuesta.getLeft());
    } else {
      return response.status(404).json(respuesta.getRight().message);
    }
  }
}
