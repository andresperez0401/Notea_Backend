import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { EliminarNotaService } from "src/Nota/Aplicacion/EliminarNota.service";
import { EliminarNotaDto } from "src/Nota/Aplicacion/dto/EliminarNota.dto";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";

@Controller('nota')
export class eliminarNotaController {
    constructor(
        private logger: ILoggerImplementation,
        private eliminarService : EliminarNotaService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.eliminarService =  new EliminarNotaService(this.repositorio);
        };


        @Delete()
        async eliminarNota(@Res() response , @Body() id :EliminarNotaDto){
            
            const decorator = new LoggerService<EliminarNotaDto,string>(this.logger,this.eliminarService,"Eliminar nota service: se ha eliminado la nota de id: " + id.id);
            const n = await decorator.execute(id);
            if (n.isLeft()) {
                return response.status(200).json(n.getLeft());
            }
            else {
                return response.status(404).json(n.getRight().message);
            }
        }
}