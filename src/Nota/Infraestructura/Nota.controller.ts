/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Inject, Post} from "@nestjs/common";
import { Nota } from "src/nota/dominio/AgregadoNota";
import { CrearNotaService } from "../Aplicacion/CrearNota.service";
import { CrearNotaDto } from "./dto/CrearNota.dto";
import { Either } from "src/Utils/Either";

@Controller('nota')
export class NotaController {

    constructor(private readonly crearNotaService : CrearNotaService){};

    @Post()
    async save(@Body() nota:CrearNotaDto): Promise<Either<Nota,Error>>{

        const  n =  await this.crearNotaService.execute(nota);

        if (n.isLeft()){ //validamos que el resultado sea correcto
            return n;
        }else{
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
    }

}