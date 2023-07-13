/* eslint-disable prettier/prettier */
import { IdContenidoNota } from './ValueObjectsContenido/IdContenidoNota';

interface IContenidoNota {
  id: IdContenidoNota;
  orden: number;

  toString(): string;
  getOrden(): number;
  getId(): number;
}

export { IContenidoNota };

class EntidadTextoNotaa implements IContenidoNota{
    id: IdContenidoNota;
    orden: number;
    texto: string;

    constructor(id: IdContenidoNota, orden: number){
        this.id = id;
        this.orden = orden;
    }

    toString(): string{
        return "texto";
    }
}
