/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../dominio/AgregadoNota";
import { Injectable, Inject } from "@nestjs/common";
import { Either } from "src/utils/either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { RepositorioNotaImp } from "../Infraestructura/repository/RepositorioNotaImp";

@Injectable()
export class BuscarNotas implements IAplicationService<null, Iterable<Nota>>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        @Inject(RepositorioNotaImp)
        repositorioNota: RepositorioNota){
        this.repositorioNota = repositorioNota;
    }

    async execute(s: null): Promise<Either<Iterable<Nota>, Error>> {
        return await this.repositorioNota.buscarNotas();
    }
}