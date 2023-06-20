/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res} from "@nestjs/common";
import { Nota } from "src/Nota/Dominio/AgregadoNota";
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
    async buscarNotas(@Res() response): Promise<Either<Iterable<Nota>, Error>>{
        console.log('Get All Notas');
        const n = await this.buscarNotasService.execute(null);
        
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }
    
    @Post()
    async crearNota(@Res() response, @Body() nota:CrearNotaDto): Promise<Either<Nota,Error>>{
        console.log('Post Nota');
        //new crearnotaservice
        const  n =  await this.crearNotaService.execute(nota);

        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }
    
    @Delete()
    async eliminarNota(@Res() response , @Body() id :EliminarNotaDto){
        console.log('Delete  Nota');
        const n = await this.eliminarNotaService.execute(id);
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Patch()
    async update(@Res() response, @Body() notaMod: ModificarNotaDto): Promise<Either<string,Error>> {
        console.log('Mod  Nota');
        const n =  await this.ModificarNotaService.execute(notaMod)
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
         
    }


}