/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../dominio/AgregadoNota";
import { Injectable, Inject } from "@nestjs/common";
import { Either } from "src/utils/either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { RepositorioNotaImp } from "../Infraestructura/repository/RepositorioNotaImp";
import { ModificarNotaDto } from "./dto/ModificarNota.dto";

@Injectable()
export class ModificarNotaService implements IAplicationService<ModificarNotaDto,string>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        @Inject(RepositorioNotaImp)
        repositorioNota: RepositorioNota){
        
        this.repositorioNota = repositorioNota;
    }

    async execute(s: ModificarNotaDto): Promise<Either<string,Error>> {        

        return await this.repositorioNota.updateNota(s);
    }
}