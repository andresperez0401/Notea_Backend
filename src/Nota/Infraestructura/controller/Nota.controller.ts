/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post,Get,Delete, Param,Patch} from "@nestjs/common";
import { Nota } from "src/nota/dominio/AgregadoNota";
import { CrearNotaService } from "../../Aplicacion/CrearNota.service";
import { CrearNotaDto } from "../../Aplicacion/dto/CrearNota.dto";
import { Either } from "src/Utils/Either";
import { EliminarNotaService } from "src/Nota/Aplicacion/EliminarNota.service";
import { EliminarNotaDto } from "src/Nota/Aplicacion/dto/EliminarNota.dto";
import { ModificarNotaDto } from "src/Nota/Aplicacion/dto/ModificarNota.dto";
import { ModificarNotaService } from "src/Nota/Aplicacion/ModificarNota.service";
import { BuscarNotas } from "src/Nota/Aplicacion/BuscarNotas.service";


@Controller('nota')
export class NotaController {

    constructor(
        @Inject(CrearNotaService)
        @Inject(EliminarNotaService)
        @Inject(ModificarNotaService)
        @Inject(BuscarNotas)
        private readonly crearNotaService : CrearNotaService,
        private readonly eliminarNotaService : EliminarNotaService,
        private readonly ModificarNotaService : ModificarNotaService,
        private readonly buscarNotasService : BuscarNotas){
           
            this.crearNotaService = crearNotaService;
            this.eliminarNotaService = eliminarNotaService;
            this.ModificarNotaService = ModificarNotaService;
            this.buscarNotasService = buscarNotasService

        };

    @Get('/all')
    async buscarNotas(): Promise<Either<Iterable<Nota>, Error>>{
        console.log('Get All Notas');
        const n = await this.buscarNotasService.execute(null);
        
        if (n.isLeft()){ //validamos que el resultado sea correcto
            return n;
        }else{
            return Either.makeRight<Iterable<Nota>,Error>(new Error('Error al obtener las notas'));
        }
    }
    
    @Post()
    async crearNota(@Body() nota:CrearNotaDto): Promise<Either<Nota,Error>>{
        console.log('Post Nota');
        //new crearnotaservice
        const  n =  await this.crearNotaService.execute(nota);

        if (n.isLeft()){ //validamos que el resultado sea correcto
            return n;
        }else{
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
    }
    
    @Delete()
    async eliminarNota(@Body() id :EliminarNotaDto){
        console.log('Delete  Nota');
        const eliminar = this.eliminarNotaService.execute(id);
        if ((await eliminar).isLeft){ //validamos que el resultado sea correcto
            return eliminar;
        }else{
            return Either.makeRight<string,Error>(new Error('Error al eliminar la nota'));
        }
    }

    @Patch()
    async update(@Body() notaMod: ModificarNotaDto): Promise<Either<string,Error>> {
        console.log('Mod  Nota');
        const modificar =  this.ModificarNotaService.execute(notaMod)
        if ((await modificar).isLeft){ //validamos que el resultado sea correcto
            return modificar;
        }else{
            return Either.makeRight<string,Error>(new Error('Error al eliminar la nota'));
        }
         
    }


}