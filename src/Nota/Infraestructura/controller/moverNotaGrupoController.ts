import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { Either } from "src/Utils/Either";
import { cambiarGrupoNotaService } from "src/Nota/Aplicacion/cambiarGrupoNota.service";
import { CambiarGrupoNotaDto } from "src/Nota/Aplicacion/dto/CambiarGrupoNota.dto";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";

@Controller('nota')
export class moverNotaGrupoController {
    constructor(
        private logger: ILoggerImplementation,
        private moverNotaService : cambiarGrupoNotaService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.moverNotaService =  new cambiarGrupoNotaService(this.repositorio);
        };


        @Patch('/moverNota')
        async moveNote(@Res() response, @Body() notamove: CambiarGrupoNotaDto): Promise<Either<string,Error>> {
            
            const decorator = new LoggerService<CambiarGrupoNotaDto,string>(this.logger, this.moverNotaService, "Cambiar grupo de Nota Service: El nuevo grupo de la nota de id: " + notamove.id+ ", es el grupo de id: " + notamove.idGrupo);
            const n =  await decorator.execute(notamove)
            if (n.isLeft()) {
                return response.status(200).json(n.getLeft());
            }
            else {
                return response.status(404).json(n.getRight().message);
            }
        }       

}
