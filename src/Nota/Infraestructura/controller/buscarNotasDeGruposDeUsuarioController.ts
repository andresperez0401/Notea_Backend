import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { BuscarNotasDeGruposService} from "src/Nota/Aplicacion/BuscarNotasGrupos.service";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";

@Controller('nota')
export class buscarNotasDeUsuarioController {
    constructor(
        private logger: ILoggerImplementation,
        private buscarNotasDeUsuarioService : BuscarNotasDeGruposService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.buscarNotasDeUsuarioService =  new BuscarNotasDeGruposService(this.repositorio);
        };

        @Post('/grupos')
        async buscarNotasDeGrupos(@Res() response, @Body() grupos: Iterable<string>) {
            const decorator = new LoggerService<Iterable<string>, string>(this.logger, this.buscarNotasDeUsuarioService, "Buscar Notas de Grupos de Usuario Service: se han buscado todas las notas de los grupos de id: " + grupos);
            const n = await decorator.execute(grupos);
            if (n.isLeft()) {
                return response.status(200).json(n.getLeft());
            }
            else {
                return response.status(404).json(n.getRight().message);
            }
        }
    }