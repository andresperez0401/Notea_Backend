/* eslint-disable prettier/prettier */
import { EstadoEnum } from "./ValueObjectsNota/EstadoEnum";
import { IdNota } from "./ValueObjectsNota/IdNota";
import { VOTituloNota } from "./ValueObjectsNota/VOTituloNota";
import { VOubicacionNota } from "./ValueObjectsNota/VOUbicacionNota";
import { idGrupo } from "src/Grupo/Dominio/ValueObjectsGrupo/idGrupo";
import { Optional } from "src/Utils/Opcional";
import { EntidadContenidoNota } from "./Entidades/EntidadContenidoNota";
import { FabricaContenido, IContenidoNota } from "./Entidades/IContenidoNota";

export class Nota{

    private id: IdNota;
    private titulo: VOTituloNota;
    private contenido: Optional<Array<IContenidoNota>>;
    private fechaCreacion: Date;
    private ubicacion: Optional<VOubicacionNota>; 
    private estado: EstadoEnum;
    private grupo: idGrupo;


    private constructor(titulo: VOTituloNota, contenido: Optional<Array<IContenidoNota>>,
        fechaCreacion: Date, estado: EstadoEnum,
        ubicacion: Optional<VOubicacionNota>, grupoId: idGrupo,
        id: IdNota){
            this.id = id;
            this.titulo = titulo;
            this.contenido = contenido;
            this.fechaCreacion = fechaCreacion;
            this.estado = estado;
            this.ubicacion = ubicacion;
            this.grupo = grupoId;
        }
    
    //Los constructores estaticos son una alternativa a los Factories
    //la nota crea tambien la entidad ContenidoNota?
        static crearNota(titulo: string, fechaCreacion: Date,  estado: EstadoEnum,
            grupoId: string, 
            latitud: Optional<number>, longitud:  Optional<number>,
            contenido: Optional<any>, 
            id?: string): Nota{

            const opUbicacion = VOubicacionNota.crearUbicacionNota(latitud, longitud);

            //const opContenido = EntidadContenidoNota.crearContenidoNotaFromJson(contenido); 
            //convertimos el json (contenido) a un arreglo de tipo EntidadContenidoNota

            const opContenido = FabricaContenido.crearContenidoNotaFromJson(contenido)
                
            return new Nota(
                VOTituloNota.crearTituloNota(titulo),
                opContenido,
                fechaCreacion, 
                EstadoEnum[estado], 
                opUbicacion,
                idGrupo.crearIdGrupo(grupoId),
                IdNota.crearIdNota(id),
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
    
        public getContenido(): Iterable<IContenidoNota>{
            return this.contenido.getValue();
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

        public existeContenido(): boolean{
            return this.contenido.hasvalue();
        }
    
        public getUbicacion(): Map<string, number>{
            if (!this.ubicacion.hasvalue())
                return new Map<string, number>();
            return new Map<string, number>([
                ['latitud', this.ubicacion.getValue().getLatitud()],
                ['longitud', this.ubicacion.getValue().getLongitud()]
            ]);
            
        }
    
        public setEstado(estado: EstadoEnum): void{
            this.estado = estado;
        }
    
        public setTitulo(titulo: VOTituloNota): void{
            this.titulo = titulo;
        }
    
        public setContenido(contenido: Array<IContenidoNota>): void{
            this.contenido = new Optional<Array<IContenidoNota>>(contenido);
        }
    }