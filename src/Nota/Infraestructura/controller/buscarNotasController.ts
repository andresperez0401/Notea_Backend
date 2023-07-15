import { Body, Controller,Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { Either } from "src/Utils/Either";
import { BuscarNotas } from "src/Nota/Aplicacion/BuscarNotas.service";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";
import { ILoggerImplementation } from "src/Decorators/Infraestructura/ILoggerImplementation";
import { LoggerService } from "src/Decorators/Aplicacion/LoggerService";


@Controller('nota')
export class buscarNotasController {
    constructor(
        private buscarNotasService : BuscarNotas,
        private repositorio: RepositorioNotaImp,
        private logger : ILoggerImplementation,
        ){
           this.logger = new ILoggerImplementation();
           this.buscarNotasService = new BuscarNotas(this.repositorio);
        };

@Get('/all')
async buscarNotas(@Res() response): Promise<Either<any, Error>>{
    
    const decorator = new LoggerService<string,string>(this.logger,this.buscarNotasService, "Buscar Notas Service: Se han buscado todas las notas");
    const n = await decorator.execute(null); 
    if (n.isLeft()) {
        return response.status(200).json(n.getLeft());
    }
    else {
        return response.status(404).json(n.getRight().message);
    }
}

}
