/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Inject, Post} from "@nestjs/common";
import { Nota } from "src/nota/dominio/AgregadoNota";

@Controller('nota')
export class NotaController {

    constructor(){};

    @Post()
    async save(@Body() nota:Nota){
        return await ;
    }

}