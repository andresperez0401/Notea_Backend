/* eslint-disable prettier/prettier */
import { Either } from "src/Utils/Either";
import { Nota } from "./AgregadoNota";
import { EntidadNota } from "../Infraestructura/Entidades/EntidadNota";

export interface RepositorioNota {
     crearNota(nota: Nota): Promise<Either<Nota,Error>>;
    // buscarNota(id: string): Promise<Either<Nota,Error>>;
    // buscarNotas(): Promise<Either<Nota[],Error>>;
    // eliminarNota(id: string): Promise<Either<Nota,Error>>;
    // buscarNotasPorEstado(estado: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorKeyword(keyword: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorFecha(fecha: Date): Promise<Either<Nota[],Error>>;
}