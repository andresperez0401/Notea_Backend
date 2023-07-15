import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { buscarNotasDeGrupoService } from "src/Nota/Aplicacion/BuscarNotaDeGrupo.service";
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