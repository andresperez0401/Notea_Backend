/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../Dominio/AgregadoNota";
import { Inject } from "@nestjs/common";
import { Either } from "src/Utils/Either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { ModificarNotaDto } from "./dto/ModificarNota.dto";


export class ModificarNotaService implements IAplicationService<ModificarNotaDto,string>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        @Inject('RepositorioNota')
        repositorioNota: RepositorioNota){
        
        this.repositorioNota = repositorioNota;
    }

    async execute(s: ModificarNotaDto): Promise<Either<string,Error>> {        

        return await this.repositorioNota.updateNota(s);
    }
}