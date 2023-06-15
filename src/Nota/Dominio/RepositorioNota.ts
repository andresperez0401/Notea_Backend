/* eslint-disable prettier/prettier */
import { Either } from "src/Utils/Either";
import { Nota } from "./AgregadoNota";

export interface RepositorioNota {
    crearNota(nota: Nota): Promise<Either<Nota,Error>>;
    // buscarNota(id: string): Promise<Either<Nota,Error>>;
    buscarNotas(): Promise<Either<Iterable<Nota>,Error>>;
    eliminarNota(id: string): Promise<Either<string,Error>>;
    // buscarNotasPorEstado(estado: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorKeyword(keyword: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorFecha(fecha: Date): Promise<Either<Nota[],Error>>;
}