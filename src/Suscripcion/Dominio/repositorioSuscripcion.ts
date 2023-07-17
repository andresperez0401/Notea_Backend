import { Either } from "src/Utils/Either";
import { Suscripcion } from "./AgregadoSuscripcion";

export interface RepositorioSuscripcion {
    crearSuscripcion(suscripcion: Suscripcion): Promise<Either<Suscripcion,Error>>;
    updateSuscripcion(suscripcion: Suscripcion): Promise<Either<string,Error>>;
    cambiarEstadoSuscripcion(id: string, estado:string): Promise<Either<string,Error>>;
    buscarSuscripciones(): Promise<Either<Iterable<Suscripcion>,Error>>;
    eliminarSuscripcion(id: string): Promise<Either<string,Error>>;
    buscarSuscripcionUsuario(idUsuario: string): Promise<Either<Suscripcion,Error>>;
}
