/* eslint-disable prettier/prettier */
import { Either } from "src/Utils/Either";
import { Nota } from "./AgregadoNota";
import { ModificarNotaDto } from "../Aplicacion/dto/ModificarNota.dto";

export interface RepositorioNota {
     crearNota(nota: Nota): Promise<Either<Nota,Error>>;
     updateNota(infoNota : ModificarNotaDto): Promise<Either<string,Error>>;
     // buscarNota(id: string): Promise<Either<Nota,Error>>;
    buscarNotas(): Promise<Either<Iterable<Nota>,Error>>;
    eliminarNota(id: string): Promise<Either<string,Error>>;
    // buscarNotasPorEstado(estado: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorKeyword(keyword: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorFecha(fecha: Date): Promise<Either<Nota[],Error>>;
    buscarNotasDeGrupo(
        idGrupo: string,
      ): Promise<Either<Iterable<Nota>, Error>>;
}