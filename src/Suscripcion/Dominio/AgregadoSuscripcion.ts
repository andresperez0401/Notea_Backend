import { Optional } from "src/Utils/Opcional";
import { idSuscripcion } from "./idSuscripcion";
import { TipoSuscripcionEnum } from "./tipoSuscripcionEnum";
import { idUsuario } from "src/Usuario/Dominio/value_objects/idUsuario";



export class Suscripcion{

    private id: idSuscripcion;
    private fechaInicio: Date;
    private fechaFin: Optional<Date>;
    private tipo: TipoSuscripcionEnum;
    private idUsuario: idUsuario;

    constructor(fechaInicio: Date, tipo: TipoSuscripcionEnum, idUsuario: idUsuario, id: idSuscripcion, fechaFin: Optional<Date>){
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.tipo = tipo;
        this.idUsuario = idUsuario;
        this.fechaFin = fechaFin;
    }

    static crearSuscripcion(fechaInicio: Date, tipo: TipoSuscripcionEnum, idUser: string,fechaFin: Optional<Date>, id?: string,): Suscripcion{
        
        return new Suscripcion(
            fechaInicio,
            TipoSuscripcionEnum[tipo],
            idUsuario.crearIdUsuario(idUser),
            idSuscripcion.crearIdSuscripcion(id),
            fechaFin,
        );
    }

    public getId(): string{
        return this.id.getValue();
    }
    public getFechaInicio(): Date{  
        return this.fechaInicio;
    }
    public getFechaFin(): Optional<Date>{
        return this.fechaFin;
    }
    public getTipo(): string{
        return this.tipo.toString();;
    }
    public getIdUsuario(): string{
        return this.idUsuario.getValue();
    }

    public setFechaFin(fechaFin: Date): void{
        this.fechaFin = new Optional<Date>(fechaFin);
    }

    public setTipo(tipo: TipoSuscripcionEnum): void{
        this.tipo = tipo;
    }
}