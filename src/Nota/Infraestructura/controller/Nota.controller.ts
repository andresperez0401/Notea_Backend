/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post,Get,Delete, Param} from "@nestjs/common";
import { Nota } from "src/nota/dominio/AgregadoNota";
import { CrearNotaService } from "../../Aplicacion/CrearNota.service";
import { CrearNotaDto } from "../../Aplicacion/dto/CrearNota.dto";
import { Either } from "src/Utils/Either";
import { EliminarNotaService } from "src/Nota/Aplicacion/EliminarNota.service";
import { eliminarUsuarioService } from "src/Usuario/Aplicacion/eliminarUsuarioService";
import { EliminarNotaDto } from "src/Nota/Aplicacion/dto/EliminarNota.dto";
import { getAllNotasService } from "src/Nota/Aplicacion/GetAllNotas.service";

@Controller('nota')
export class NotaController {

    constructor(
        @Inject(CrearNotaService)
        @Inject(EliminarNotaService)
        @Inject(getAllNotasService)
        private readonly crearNotaService : CrearNotaService,
        private readonly eliminarNotaService : EliminarNotaService,
        private readonly getAllNotasService : getAllNotasService){
            this.crearNotaService = crearNotaService;
            this.eliminarNotaService = eliminarNotaService;
            this.getAllNotasService = getAllNotasService;
        };

    @Get('/all')
    async getNotes(): Promise<Either<Iterable<Nota>, Error>>{
        console.log('Get All Notas');
        const n = await this.getAllNotasService.execute(null);
        
        if (n.isLeft()){ //validamos que el resultado sea correcto
            return n;
        }else{
            return Either.makeRight<Iterable<Nota>,Error>(new Error('Error al obtener las notas'));
        }
    }
    
    @Post()
    async save(@Body() nota:CrearNotaDto): Promise<Either<Nota,Error>>{
        console.log('Post Nota');
        const  n =  await this.crearNotaService.execute(nota);

        if (n.isLeft()){ //validamos que el resultado sea correcto
            return n;
        }else{
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
    }
    
    @Delete()
    async delete(@Body() id :EliminarNotaDto){
        console.log('Delete  Nota');
        const eliminar = this.eliminarNotaService.execute(id);
        if ((await eliminar).isLeft){ //validamos que el resultado sea correcto
            return eliminar;
        }else{
            return Either.makeRight<string,Error>(new Error('Error al eliminar la nota'));
        }
    }


}