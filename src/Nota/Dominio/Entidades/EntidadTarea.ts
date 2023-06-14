/* eslint-disable prettier/prettier */
import { VOTituloTarea } from "./ValueObjectsTarea/VONombreTarea";
import { IdTarea } from "./ValueObjectsTarea/idTarea";


export class Tarea{

    private id: IdTarea;
    private titulo: VOTituloTarea;
    private check: boolean;

    private constructor(titulo: VOTituloTarea){
        this.id = IdTarea.crearIdTarea();
        this.titulo = titulo;
        this.check = false;
    }

    //Los constructores estaticos son una alternativa a los Factories
    static crearTarea(titulo: string): Tarea{

       // if (Object.values(EstadoEnum).includes(estado)) { //validacion???
            return new Tarea(
                VOTituloTarea.crearTituloTarea(titulo))
            // } else {
            //     throw new error();
            // }
    }

    //los get deben retornar primitivos, no objetos
    // asi no violamos la ley de demeter
    public getId(): string{
        return this.id.getId();
    }

    public getTitulo(): string{
        return this.titulo.getTituloTarea();
    }

    public setTitulo(titulo: VOTituloTarea): void{
        this.titulo = titulo;
    }

    public getCheck(): boolean{
        return this.check;
    }

    public CheckUncheck(): void{
        this.check = !this.check;
    }

} 
