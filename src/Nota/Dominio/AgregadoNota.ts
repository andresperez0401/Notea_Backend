/* eslint-disable prettier/prettier */
import { error } from "console";
import { EstadoEnum } from "./ValueObjectsNota/EstadoEnum";
import { IdNota } from "./ValueObjectsNota/IdNota";
import { VOContenidoNota } from "./ValueObjectsNota/VOContenidoNota";
import { VOTituloNota } from "./ValueObjectsNota/VOTituloNota";
import { VOubicacionNota } from "./ValueObjectsNota/VOUbicacionNota";
import { Tarea } from "./Entidades/EntidadTarea";

export class Nota{

    private id: IdNota;
    private titulo: VOTituloNota;
    private contenido: VOContenidoNota;
    private fechaCreacion: Date;
    private ubicacion: VOubicacionNota;
    private estado: EstadoEnum;
    //private tareas : Array<Tarea>

    private constructor(titulo: VOTituloNota, contenido: VOContenidoNota, 
        fechaCreacion: Date, estado: EstadoEnum, 
        ubicacion: VOubicacionNota, /*tareas?: Array<Tarea>,*/ id?: IdNota){

        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.ubicacion = ubicacion;
        //this.tareas = tareas;
    }

    //Los constructores estaticos son una alternativa a los Factories
    static crearNota(titulo: string, contenido: string, 
        fechaCreacion: Date,  estado: EstadoEnum, latitud: number, longitud: 
        number, /*tareas?: Array<string>,*/ id?: string): Nota{

       // if (Object.values(EstadoEnum).includes(estado)) { //validacion???
            return new Nota(
                VOTituloNota.crearTituloNota(titulo), 
                VOContenidoNota.crearContenidoNota(contenido), 
                fechaCreacion, 
                EstadoEnum[estado], 
                VOubicacionNota.crearUbicacionNota(latitud, longitud),
                //tareas?.map(tarea => Tarea.crearTarea(tarea)),
                IdNota.crearIdNota(id)
                );
            // } else {
            //     throw new error();
            // }
            
    }

    //los get deben retornar primitivos, no objetos
    // asi no violamos la ley de demeter
    public getId(): string{
        return this.id.getValue();
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
