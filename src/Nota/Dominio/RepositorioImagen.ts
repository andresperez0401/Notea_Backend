/* eslint-disable prettier/prettier */
import { Either } from "src/Utils/Either";
import { VOImagen } from "./ValueObjectsNota/VOImagen";

export interface RepositorioImagen {
    subirImagen(imagen: VOImagen): Promise<Either<VOImagen,Error>>;
    buscarImagen(id: number): Promise<Either<VOImagen,Error>>
}