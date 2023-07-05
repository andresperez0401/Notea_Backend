/* eslint-disable prettier/prettier */
import { Optional } from "src/Utils/Opcional";
import { IdTarea } from "./ValueObjectsTarea/idTarea";


export class EntidadTareaNota{

    private id: IdTarea;
    private titulo: string;
    private check: boolean;

    private constructor(id: IdTarea, titulo: string, check: boolean){
        this.id = id;
        this.titulo = titulo;
        this.check = check;
    }

    //Los constructores estaticos son una alternativa a los Factories
    static crearTareaNota(titulo: string, check: boolean, id?: string): EntidadTareaNota{
        return new EntidadTareaNota(
            IdTarea.crearIdTarea(id),
            titulo,
            check
            )
    }

    //factory para crear un array de tareas a partir de sus primitivos
    static crearTareasNota(tareas: Optional<Array<string>>, 
                            checks: Optional<Array<boolean>>, 
                            id: Optional<Array<string>>): Optional<Array<EntidadTareaNota>>{
        
        if(!tareas.hasvalue || !checks.hasvalue()){
            return new Optional<Array<EntidadTareaNota>>();
        }
        const tareasNota: Array<EntidadTareaNota> = new Array<EntidadTareaNota>();
        for(let i = 0; i < tareas.getValue().length; i++){
            const idTarea = id.hasvalue() ? id.getValue()[i] : undefined; //perdon por esto undefined debo cambiarlo jeje
            tareasNota.push(EntidadTareaNota.crearTareaNota(tareas.getValue()[i], checks.getValue()[i], idTarea));
        }
        return new Optional<Array<EntidadTareaNota>>(tareasNota);
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

    public isCompletada(): boolean{
        return this.check;
    }
} 