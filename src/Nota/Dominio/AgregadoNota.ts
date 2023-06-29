/* eslint-disable prettier/prettier */
import { error } from "console";
import { EstadoEnum } from "./ValueObjectsNota/EstadoEnum";
import { IdNota } from "./ValueObjectsNota/IdNota";
import { VOContenidoNota } from "./ValueObjectsNota/VOContenidoNota";
import { VOTituloNota } from "./ValueObjectsNota/VOTituloNota";
import { VOubicacionNota } from "./ValueObjectsNota/VOUbicacionNota";
import { idGrupo } from "src/Grupo/Dominio/ValueObjectsGrupo/idGrupo";
import { VOImagen } from "./ValueObjectsNota/VOImagen";
import { Optional } from "src/Utils/Opcional";
import { EntidadTarea } from "./Entidades/EntidadTarea";

export class Nota{

    private id: IdNota;
    private titulo: VOTituloNota;
    private contenido: VOContenidoNota;
    private fechaCreacion: Date;
    private ubicacion: Optional<VOubicacionNota>; 
    private estado: EstadoEnum;
    private tareas : Optional<Array<EntidadTarea>>
    private imagenes: Optional<Array<VOImagen>>
    private grupo: idGrupo;

    private constructor(titulo: VOTituloNota, contenido: VOContenidoNota,
        fechaCreacion: Date, estado: EstadoEnum,
        ubicacion: Optional<VOubicacionNota>, tareas: Optional<Array<EntidadTarea>>, grupoId: idGrupo,
        id: IdNota, imagenes: Optional<Array<VOImagen>>){

            this.id = id;
            this.titulo = titulo;
            this.contenido = contenido;
            this.fechaCreacion = fechaCreacion;
            this.estado = estado;
            this.ubicacion = ubicacion;
            this.tareas = tareas;
            this.grupo = grupoId;
            this.imagenes = imagenes;
        }
    
    //Los constructores estaticos son una alternativa a los Factories
        static crearNota(titulo: string, contenido: string, fechaCreacion: Date,  estado: EstadoEnum,
            grupoId: string, 
            latitud: Optional<number>, longitud: Optional<number>, 
            tareas: Optional<Array<string>>, checks: Optional<Array<boolean>>, idTareas: Optional<Array<string>>,
            id?: string, 
            imagenes?: Array<VOImagen>): Nota{

                const tareasCreadas = EntidadTarea.crearTareasNota(tareas, checks, idTareas);

                const opImagenes = new Optional<Array<VOImagen>>(imagenes);

                let opUbicacion = new Optional<VOubicacionNota>(); //deberia ser un factory
                if (latitud.hasvalue() && longitud.hasvalue())
                    opUbicacion = new Optional<VOubicacionNota>(VOubicacionNota.crearUbicacionNota(latitud.getValue(), longitud.getValue()));
                    
                return new Nota(
                    VOTituloNota.crearTituloNota(titulo),
                    VOContenidoNota.crearContenidoNota(contenido),
                    fechaCreacion, 
                    EstadoEnum[estado], 
                    opUbicacion,
                    tareasCreadas,
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
            if (!this.ubicacion.hasvalue())
                return new Map<string, number>();
            return new Map<string, number>([
                ['latitud', this.ubicacion.getValue().getLatitud()],
                ['longitud', this.ubicacion.getValue().getLongitud()]
            ]);
            
        }

        public existeTareas(): boolean{
            return this.tareas.hasvalue();
        }

        public existenImagenes(): boolean{
            return this.imagenes.hasvalue();
        }

        public getTareas(): Array<EntidadTarea>{
            return this.tareas.getValue();
        }

        public getImagenes(): Array<VOImagen>{
            return this.imagenes.getValue();
        }

        public getTareasCompletadas(): number{
            let completadas = 0;
            this.tareas.getValue().forEach(tarea => {
                if (tarea.getCheck())
                    completadas++;
            });
            return completadas;
        }

        public setTareas(tareas: Array<EntidadTarea>): void{
            this.tareas = new Optional<Array<EntidadTarea>>(tareas);
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