/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../Dominio/AgregadoNota";
import { Inject } from "@nestjs/common";
import { Either } from "src/Utils/Either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { ModificarNotaDto } from "./dto/ModificarNota.dto";
import { VOImagen } from "../Dominio/Entidades/VOImagen";


export class ModificarNotaService implements IAplicationService<ModificarNotaDto,string>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        @Inject('RepositorioNota')
        repositorioNota: RepositorioNota){
        
        this.repositorioNota = repositorioNota;
    }

    async execute(s: ModificarNotaDto): Promise<Either<string,Error>> {      
        
        let im: VOImagen[] = [];

        if (s.imagenes.length >= 1) {
        im = s.imagenes.map((i) => {
        return VOImagen.crearImagenNota(i.nombre, i.buffer); 
        });
        }

        await this.repositorioNota.guardarImagenes(s.id, im);

        return await this.repositorioNota.updateNota(s);
    }
}