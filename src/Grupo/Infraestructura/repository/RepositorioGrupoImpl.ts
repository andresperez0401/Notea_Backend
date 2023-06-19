import { InjectRepository } from "@nestjs/typeorm";
import { RepositorioGrupo } from "src/Grupo/Dominio/RepositorioGrupo";
import { EntidadGrupo } from "../entities/EntidadGrupo";
import { Repository } from "typeorm";
import { Grupo } from "src/Grupo/Dominio/AgregadoGrupo";
import { Either } from "src/utils/either";


export class RepositorioGrupoImp implements RepositorioGrupo{

    constructor (
        @InjectRepository(EntidadGrupo)
        private readonly grupoRepo: Repository<EntidadGrupo>,
    ) {}

    async creargrupo(grupo: Grupo): Promise<Either<Grupo, Error>> {
        const grupoEntidad = new EntidadGrupo();
        grupoEntidad.id = grupo.getId();
        grupoEntidad.nombre = grupo.getNombre();
        grupoEntidad.idUsuario = grupo.getIdUsuario();
        
        const respuesta = await this.grupoRepo.save(grupoEntidad);

        if (respuesta){
            return Either.makeLeft<Grupo,Error>(grupo);
        }
        else{
            return Either.makeRight<Grupo,Error>(new Error('Usuario no creado'));
        }
    }


}