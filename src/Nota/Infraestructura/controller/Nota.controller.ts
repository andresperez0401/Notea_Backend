/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post,Get,Delete, Param} from "@nestjs/common";
import { Nota } from "src/nota/dominio/AgregadoNota";
import { CrearNotaService } from "../../Aplicacion/CrearNota.service";
import { CrearNotaDto } from "../../Aplicacion/dto/CrearNota.dto";
import { Either } from "src/Utils/Either";
import { EliminarNotaService } from "src/Nota/Aplicacion/EliminarNota.service";
import { eliminarUsuarioService } from "src/Usuario/Aplicacion/eliminarUsuarioService";
import { EliminarNotaDto } from "src/Nota/Aplicacion/dto/EliminarNota.dto";

@Controller('nota')
export class NotaController {

    constructor(
        @Inject(CrearNotaService)
        @Inject(EliminarNotaService)
        private readonly crearNotaService : CrearNotaService,
        private readonly eliminarNotaService : EliminarNotaService){
            this.crearNotaService = crearNotaService;
            this.eliminarNotaService = eliminarNotaService;
        };

    @Get()
    getNote(): string{
        return "Creacion de notas"
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
        const eliminar = this.eliminarNotaService.execute(id);
        if ((await eliminar).isLeft){ //validamos que el resultado sea correcto
            return eliminar;
        }else{
            return Either.makeRight<string,Error>(new Error('Error al eliminar la nota'));
        }
    }


}