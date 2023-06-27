/* eslint-disable prettier/prettier */
import { EstiloEnum } from "../ValueObjectsNota/EstiloEnum";
import { IdTextoNota } from "./idTextoNota";


export class EntidadTextoNota{

    private id: IdTextoNota;
    private texto: string;
    private estilos: Array<EstiloEnum>;

    private constructor(id: IdTextoNota, texto: string, estilos: Array<EstiloEnum>){
        this.id = id;
        this.texto = texto;
        this.estilos = estilos;
    }

    static crearTextoNota(texto: string, estilos: Array<string>, id?: string): EntidadTextoNota{
        return new EntidadTextoNota(
            IdTextoNota.crearIdTextoNota(id),
            texto,
            estilos.map((estilo) => EstiloEnum[estilo])
        )
    }

    public getId(): string{
        return this.id.getValue();
    }

    public getTexto(): string{
        return this.texto;
    }

    public getEstilos(): Array<EstiloEnum>{
        return this.estilos;
    }

    public agregarEstilo(estilo: EstiloEnum): void{
        this.estilos.push(estilo);
    }

    public eliminarEstilo(estilo: EstiloEnum): void{
        this.estilos = this.estilos.filter((estiloActual) => estiloActual !== estilo);
    }

    public cambiarTexto(texto: string): void{
        this.texto = texto;
    }


} 
