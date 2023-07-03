import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../Dominio/AgregadoNota";
import { Either } from "src/Utils/Either";
import { RepositorioNota } from "../Dominio/RepositorioNota";

export class BuscarNotas implements IAplicationService<null, Iterable<Nota>>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        repositorioNota: RepositorioNota ){
        this.repositorioNota = repositorioNota;
    }

    async execute(s: null): Promise<Either<Iterable<Nota>, Error>> {
        return await this.repositorioNota.buscarNotas();
    }
}