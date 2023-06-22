/* eslint-disable prettier/prettier */
import { Either } from "src/Utils/Either";
import { Nota } from "./AgregadoNota";
import { EntidadNota } from "../Infraestructura/entities/EntidadNota";
import { ModificarNotaDto } from "../Aplicacion/dto/ModificarNota.dto";
import { moverNotaGrupo } from "../Aplicacion/dto/moverNotaGrupoDto";

export interface RepositorioNota {
     crearNota(nota: Nota): Promise<Either<Nota,Error>>;
     updateNota(infoNota : ModificarNotaDto): Promise<Either<string,Error>>;
     moverNota(notamove : moverNotaGrupo): Promise<Either<string,Error>>;
     // buscarNota(id: string): Promise<Either<Nota,Error>>;
    buscarNotas(): Promise<Either<Iterable<Nota>,Error>>;
    eliminarNota(id: string): Promise<Either<string,Error>>;
    // buscarNotasPorEstado(estado: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorKeyword(keyword: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorFecha(fecha: Date): Promise<Either<Nota[],Error>>;
}