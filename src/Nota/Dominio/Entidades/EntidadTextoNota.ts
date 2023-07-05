/* eslint-disable prettier/prettier */
import { IdTextoNota } from "./ValueObjectsTexto/idTextoNota";


export class EntidadTextoNota{

    private id: IdTextoNota;
    private texto: string;

    private constructor(id: IdTextoNota, texto: string){
        this.id = id;
        this.texto = texto;
    }

    static crearTextoNota(texto: string, id?: string): EntidadTextoNota{
        return new EntidadTextoNota(
            IdTextoNota.crearIdTextoNota(id),
            texto,
        )
    }

    public getId(): string{
        return this.id.getValue();
    }

    public getTexto(): string{
        return this.texto;
    }

    public cambiarTexto(texto: string): void{
        this.texto = texto;
    }


} 
