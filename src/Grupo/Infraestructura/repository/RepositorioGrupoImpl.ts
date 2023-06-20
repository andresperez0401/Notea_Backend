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

    async buscarGrupos(): Promise<Either<Iterable<Grupo>, Error>> {
   
        const respuesta: EntidadGrupo[] = await this.grupoRepo.find();
       
        if(respuesta){
          const grupos: Grupo[] = respuesta.map((group) =>
          //transformamos el iterable de user(entity) a usuario (dominio)
          Grupo.crearGrupo(
            group.nombre,
            group.idUsuario,
            group.id,
          ),
        );
          return Either.makeLeft<Iterable<Grupo>, Error>(grupos);
        }
        else{
          return Either.makeRight<Iterable<Grupo>,Error>(new Error ('Error al obtener los grupos'));
        }
    }


}