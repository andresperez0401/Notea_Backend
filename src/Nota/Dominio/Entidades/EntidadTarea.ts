/* eslint-disable prettier/prettier */
import { Optional } from "src/Utils/Opcional";
import { IdTarea } from "./ValueObjectsTarea/idTarea";


export class EntidadTarea{

    private id: IdTarea;
    private titulo: string;
    private check: boolean;

    private constructor(id: IdTarea, titulo: string, check: boolean){
        this.id = id;
        this.titulo = titulo;
        this.check = check;
    }

    //Los constructores estaticos son una alternativa a los Factories
    static crearTareaNota(titulo: string, check: boolean, id?: string): EntidadTarea{
        
        return new EntidadTarea(
            IdTarea.crearIdTarea(id),
            titulo,
            check
            )
    }

    //los get deben retornar primitivos, no objetos
    // asi no violamos la ley de demeter
    public getId(): string{
        return this.id.getValue();
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public setTitulo(titulo: string): void{
        this.titulo = titulo;
    }

    public getCheck(): boolean{
        return this.check;
    }

    public CheckUncheck(): void{
        this.check = !this.check;
    }

} 
