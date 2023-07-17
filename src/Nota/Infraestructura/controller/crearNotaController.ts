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
export class crearNotaController {
    constructor(
        private logger: ILoggerImplementation,
        private createNotaService : CrearNotaService,
        private repositorio: RepositorioNotaImp,
        ){
           this.logger = new ILoggerImplementation();
           this.createNotaService =  new CrearNotaService(this.repositorio);
        };


        @Post()
        @UseInterceptors(FilesInterceptor('imagenes'))
        async crearNota(@Res() response, @Body() nota:CrearNotaDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Either<Nota,Error>>{

    
            //si logramos pasar las imagenes por el body, esto no es necesario
            
            // if (files) { 
            //     if (files.length != 0) {
            //         const imagenes = files.map((file) => {
            //             return {
            //                 nombre: file.originalname,
            //                 buffer: file.buffer,
            //             }
            //         });
            //         nota.imagenes = imagenes; // se le asigna las imagenes al dto nota, para que el servicio las guarde
            //     }                               //ya que las imagenes se pasan por separado del dto
            // }
            
            const decorator = new LoggerService<CrearNotaDto,Nota>(this.logger,this.createNotaService,"Crear Nota Service: la nota: " + nota.titulo+ ", ha sido creada");
            const  n =  await decorator.execute(nota);
            if (n.isLeft()) {
                return response.status(200).json(n.getLeft());
            }
            else {
                return response.status(404).json(n.getRight().message);
            }
        }
}