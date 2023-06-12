/* eslint-disable prettier/prettier */
import { error } from "console";
import { EstadoEnum } from "./ValueObjects/EstadoEnum";
import { IdNota } from "./ValueObjects/IdNota";
import { VOContenidoNota } from "./ValueObjects/VOContenidoNota";
import { VOTituloNota } from "./ValueObjects/VOTituloNota";
import { VOubicacionNota } from "./ValueObjects/VOUbicacionNota";

export class Nota{

    private id: IdNota;
    private titulo: VOTituloNota;
    private contenido: VOContenidoNota;
    private fechaCreacion: Date;
    private ubicacion: VOubicacionNota;
    private estado: EstadoEnum;

    private constructor(titulo: VOTituloNota, contenido: VOContenidoNota, fechaCreacion: Date, estado: EstadoEnum, ubicacion: VOubicacionNota){
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.ubicacion = ubicacion;
    }

    //Los constructores estaticos son una alternativa a los Factories
    static crearNota(titulo: string, contenido: string, fechaCreacion: Date, estado: EstadoEnum, latitud: number, longitud: number): Nota{
        
        
        if (Object.values(EstadoEnum).includes(estado)) { //validacion???
            return new Nota(
                VOTituloNota.crearTituloNota(titulo), 
                VOContenidoNota.crearContenidoNota(contenido), 
                fechaCreacion, 
                EstadoEnum[estado], 
                VOubicacionNota.crearUbicacionNota(latitud, longitud));
            } else {
                throw new error();
            }
            
    }

    //los get deben retornar primitivos, no objetos
    // asi no violamos la ley de demeter
    public getId(): string{
        return this.id.getId();
    }

    public getTitulo(): string{
        return this.titulo.getTituloNota();
    }

    public getContenido(): string{
        return this.contenido.getContenidoNota();
    }

    public getFechaCreacion(): Date{
        return this.fechaCreacion;
    }

    public getEstado(): string{
        return this.estado.toString();
    }

    public getUbicacion(): Map<string, number>{
        return new Map<string, number>([
            ['latitud', this.ubicacion.getLatitud()],
            ['longitud', this.ubicacion.getLongitud()]
        ]);
    }

    public setEstado(estado: EstadoEnum): void{
        this.estado = estado;
    }

    public setTitulo(titulo: VOTituloNota): void{
        this.titulo = titulo;
    }

    public setContenido(contenido: VOContenidoNota): void{
        this.contenido = contenido;
    }

} 
