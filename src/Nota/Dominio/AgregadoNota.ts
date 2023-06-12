/* eslint-disable prettier/prettier */
import { EstadoEnum } from "./ValueObjects/EstadoEnum";
import { IdNota } from "./ValueObjects/IdNota";
import { VOContenidoNota } from "./ValueObjects/VOContenidoNota";
import { VOTituloNota } from "./ValueObjects/VOTituloNota";

export class Nota{

    private id: IdNota;
    private titulo: VOTituloNota;
    private contenido: VOContenidoNota;
    private fechaCreacion: Date;
    private estado: EstadoEnum;

    constructor(id: IdNota, fechaCreacion: Date, estado: EstadoEnum, titulo: VOTituloNota, contenido: VOContenidoNota){
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
    }

    public getId(): IdNota{
        return this.id;
    }

    public getTitulo(): VOTituloNota{
        return this.titulo;
    }

    public getCuerpo(): VOContenidoNota{
        return this.contenido;
    }

    public getFechaCreacion(): Date{
        return this.fechaCreacion;
    }

    public getEstado(): EstadoEnum{
        return this.estado;
    }

    public setEstado(estado: EstadoEnum): void{
        this.estado = estado;
    }

} 
