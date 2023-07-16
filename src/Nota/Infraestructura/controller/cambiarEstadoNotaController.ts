import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { Either } from "src/Utils/Either";
import { CambiarEstadoNotaDto } from "src/Nota/Aplicacion/dto/CambiarEstadoNota.dto";
import { cambiarEstadoNotaService } from "src/Nota/Aplicacion/cambiarEstadoNota.service";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";

@Controller('nota')
export class cambiarEstadoNotaController {
    constructor(
        private logger: ILoggerImplementation,
        private cambiarEstadoDeNotaService : cambiarEstadoNotaService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.cambiarEstadoDeNotaService =  new cambiarEstadoNotaService(this.repositorio);
        };


        @Patch('/cambiarEstado')
        async cambiarEstado(@Res() response, @Body() nota: CambiarEstadoNotaDto): Promise<Either<string,Error>> {
            const decorator = new LoggerService<CambiarEstadoNotaDto,string>(this.logger, this.cambiarEstadoDeNotaService, "Cambiar Estado Nota Service: el nuevo estado de la nota de id: " + nota.id + ", es el estado: " + nota.estado);
            const n =  await decorator.execute(nota)
            if (n.isLeft()) {
                return response.status(200).json(n.getLeft());
            }
            else {
                return response.status(404).json(n.getRight().message);
            }
        }
}