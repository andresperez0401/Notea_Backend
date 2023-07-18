import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { BuscarNotasDeGruposService} from "src/Nota/Aplicacion/BuscarNotasGrupos.service";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";
import { BuscarNotasPorPalabraService } from "src/Nota/Aplicacion/BuscarNotasPorPalabraService";
import { BuscarPorPalabraDto } from "src/Nota/Aplicacion/dto/buscarPorPalabraDto";

@Controller('nota')
export class buscarNotasPorPalabraController {
    constructor(
        private logger: ILoggerImplementation,
        private buscarNotasPorPalabraService : BuscarNotasPorPalabraService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.buscarNotasPorPalabraService =  new BuscarNotasPorPalabraService(this.repositorio);
        };

        @Patch('/grupos/palabra')
        async buscarNotasDeGrupos(@Res() response, @Body() parametro: BuscarPorPalabraDto) {
            const decorator = new LoggerService<BuscarPorPalabraDto, string>(this.logger, this.buscarNotasPorPalabraService, "Buscar Notas Por Palabra Service: se han buscado todas las notas con la palabra " + parametro.palabra);
            const n = await decorator.execute(parametro);
            if (n.isLeft()) {
                return response.status(200).json(n.getLeft());
            }
            else {
                return response.status(404).json(n.getRight().message);
            }
        }
    }