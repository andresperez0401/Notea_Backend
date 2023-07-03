/* eslint-disable prettier/prettier */
import { Either } from "src/Utils/Either";
import { Nota } from "./AgregadoNota";
import { ModificarNotaDto } from "../Aplicacion/dto/ModificarNota.dto";
import { VOImagen } from "./Entidades/VOImagen";

export interface RepositorioNota {
    crearNota(nota: Nota): Promise<Either<Nota,Error>>;
    updateNota(nota: Nota): Promise<Either<string,Error>>;
    cambiarEstadoNota(id: string, estado:string): Promise<Either<string,Error>>;
    cambiarGrupoNota(id: string, idGrupo:string): Promise<Either<string,Error>>;
     // buscarNota(id: string): Promise<Either<Nota,Error>>;
    buscarNotas(): Promise<Either<Iterable<Nota>,Error>>;
    eliminarNota(id: string): Promise<Either<string,Error>>;
    // buscarNotasPorEstado(estado: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorKeyword(keyword: string): Promise<Either<Nota[],Error>>;
    // buscarNotasPorFecha(fecha: Date): Promise<Either<Nota[],Error>>;
    guardarImagenes(id: string, imagenes: VOImagen[]): Promise<Either<string,Error>>;
    buscarNotasDeGrupo(
        idGrupo: string,
    ): Promise<Either<Iterable<Nota>, Error>>;
    buscarNotasDeGrupos(
        grupos: Iterable<string>,
    ): Promise<Either<Iterable<Nota>, Error>>;
}
