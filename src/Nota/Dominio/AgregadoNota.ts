/* eslint-disable prettier/prettier */
import { error } from "console";
import { EstadoEnum } from "./ValueObjectsNota/EstadoEnum";
import { IdNota } from "./ValueObjectsNota/IdNota";
import { VOContenidoNota } from "./ValueObjectsNota/VOContenidoNota";
import { VOTituloNota } from "./ValueObjectsNota/VOTituloNota";
import { VOubicacionNota } from "./ValueObjectsNota/VOUbicacionNota";
import { Tarea } from "./Entidades/EntidadTarea";
import { idGrupo } from "src/Grupo/Dominio/ValueObjectsGrupo/idGrupo";
import { VOImagen } from "./ValueObjectsNota/VOImagen";
import { Optional } from "src/Utils/Opcional";

export class Nota{

    private id: IdNota;
    private titulo: VOTituloNota;
    private contenido: VOContenidoNota;
    private fechaCreacion: Date;
    private ubicacion: Optional<VOubicacionNota>; 
    private estado: EstadoEnum;
    //private tareas : Optional<Array<Tarea>>
    private imagenes: Optional<Array<VOImagen>>
    private grupo: idGrupo;

    private constructor(titulo: VOTituloNota, contenido: VOContenidoNota,
        fechaCreacion: Date, estado: EstadoEnum,
        ubicacion: Optional<VOubicacionNota>, /*tareas?: Optional<Array<Tarea>>,*/ grupoId: idGrupo,
        id: IdNota, imagenes: Optional<Array<VOImagen>>){

            this.id = id;
            this.titulo = titulo;
            this.contenido = contenido;
            this.fechaCreacion = fechaCreacion;
            this.estado = estado;
            this.ubicacion = ubicacion;
            //this.tareas = tareas;
            this.grupo = grupoId;
            this.imagenes = imagenes;
        }
    
    //Los constructores estaticos son una alternativa a los Factories
        static crearNota(titulo: string, contenido: string, fechaCreacion: Date,  estado: EstadoEnum
            , /*tareas?: Array<string>,*/ grupoId: string, latitud?:number, longitud?: number, 
            id?: string, imagenes?: Array<VOImagen>): Nota{
                
                const opUbicacion = new Optional<VOubicacionNota>(VOubicacionNota.crearUbicacionNota(latitud, longitud));
                const opImagenes = new Optional<Array<VOImagen>>(imagenes);

                return new Nota(
                    VOTituloNota.crearTituloNota(titulo),
                    VOContenidoNota.crearContenidoNota(contenido),
                    fechaCreacion, 
                    EstadoEnum[estado], 
                    opUbicacion,
                    //tareas?.map(tarea => Tarea.crearTarea(tarea)),
                    idGrupo.crearIdGrupo(grupoId),
                    IdNota.crearIdNota(id),
                    opImagenes
                    );

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
        public getIdGrupo(): string{
            return this.grupo.getValue();
        }

        public existeUbicacion(): boolean{
            return this.ubicacion.hasvalue();
        }
    
        public getUbicacion(): Map<string, number>{
            return new Map<string, number>([
                ['latitud', this.ubicacion.getValue().getLatitud()],
                ['longitud', this.ubicacion.getValue().getLongitud()]
            ]);
        }

        public existenImagenes(): boolean{
            return this.imagenes.hasvalue();
        }

        public getImagenes(): Array<VOImagen>{
            return this.imagenes.getValue();
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