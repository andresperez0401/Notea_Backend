import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { Nota } from "src/Nota/Dominio/AgregadoNota";
import { CrearNotaService } from "../../Aplicacion/CrearNota.service";
import { CrearNotaDto } from "../../Aplicacion/dto/CrearNota.dto";
import { Either } from "src/Utils/Either";
import { EliminarNotaService } from "src/Nota/Aplicacion/EliminarNota.service";
import { EliminarNotaDto } from "src/Nota/Aplicacion/dto/EliminarNota.dto";
import { ModificarNotaDto } from "src/Nota/Aplicacion/dto/ModificarNota.dto";
import { ModificarNotaService } from "src/Nota/Aplicacion/ModificarNota.service";
import { BuscarNotas } from "src/Nota/Aplicacion/BuscarNotas.service";
import { cambiarGrupoNotaService } from "src/Nota/Aplicacion/cambiarGrupoNota.service";
import {  FilesInterceptor } from "@nestjs/platform-express/multer";
import { buscarNotasDeGrupoService } from "src/Nota/Aplicacion/BuscarNotaDeGrupo.service";
import { CambiarEstadoNotaDto } from "src/Nota/Aplicacion/dto/CambiarEstadoNota.dto";
import { cambiarEstadoNotaService } from "src/Nota/Aplicacion/cambiarEstadoNota.service";
import { CambiarGrupoNotaDto } from "src/Nota/Aplicacion/dto/CambiarGrupoNota.dto";
import { BuscarNotasDeGruposService} from "src/Nota/Aplicacion/BuscarNotasGrupos.service";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";

@Controller('nota')
export class buscarNotasDeGrupoController {
    constructor(
        private logger: ILoggerImplementation,
        private buscarNotasDeUnGrupoService : buscarNotasDeGrupoService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.buscarNotasDeUnGrupoService =  new buscarNotasDeGrupoService(this.repositorio);
        };

  @Get('/grupo/:idGrupo')
    async buscarGruposUsuario(@Res() response, @Param('idGrupo') id: string) {
        const decorator = new LoggerService<string,string>(this.logger, this.buscarNotasDeUnGrupoService, "Buscar Notas De Un Grupo Service: se han buscado las notas del grupo de id: " + id);
        const respuesta = await decorator.execute(id);
        if(respuesta.isLeft()){
            return response.status(200).json(respuesta.getLeft());
        }
        else{
            return response.status(404).json(respuesta.getRight().message);
        }
    }
}