import { Either } from "src/Utils/Either";
import { Suscripcion } from "./AgregadoSuscripcion";
import { Optional } from "src/Utils/Opcional";
import { cambiarTipoSuscripcionDto } from "../Aplicacion/dto/CambiarTipoSuscripcionDto";

export interface RepositorioSuscripcion {
    crearSuscripcion(suscripcion: Suscripcion): Promise<Either<Suscripcion,Error>>;
    updateSuscripcion(suscripcion: Suscripcion): Promise<Either<string,Error>>;
    cambiarTipoSuscripcion(info: cambiarTipoSuscripcionDto): Promise<Either<string,Error>>;
    buscarSuscripciones(): Promise<Either<Iterable<Suscripcion>,Error>>;
    eliminarSuscripcion(id: string): Promise<Either<string,Error>>;
    buscarSuscripcionUsuario(idUsuario: string): Promise<Either<Suscripcion,Error>>;
    buscarSuscripcionStringUsuario(idUsuario: string): Promise<Either<string,Error>>;
}
