import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrearGrupoService } from "src/Grupo/Aplicacion/crearGrupoService";
import { CrearGrupoDto } from "src/Grupo/Aplicacion/dto/CrearGrupo.dto";
import { EditarGrupoDto } from "src/Grupo/Aplicacion/dto/EditarGrupo.dto";
import { GrupoAPapeleraDto } from "src/Grupo/Aplicacion/dto/GrupoAPapelera.dto";
import { Grupo } from "src/Grupo/Dominio/AgregadoGrupo";
import { RepositorioGrupo } from "src/Grupo/Dominio/RepositorioGrupo";
import { EntidadGrupo } from "src/Grupo/Infraestructura/entities/EntidadGrupo";
import { RepositorioGrupoImp } from "src/Grupo/Infraestructura/repository/RepositorioGrupoImpl";
import { EntidadNota } from "src/Nota/Infraestructura/entities/EntidadNota";
import { EntidadUsuario } from "src/Usuario/Infraestructura/entities/EntidadUsuario";
import { Either } from "src/Utils/Either";
import { Repository } from "typeorm";


export class CrearGrupoPrueba {
   public static crearGrupoDtoValido(): CrearGrupoDto {
        const dto = new CrearGrupoDto();
        dto.nombre = 'Test';
        dto.idUsuario = 'c87eb4cb-0d04-49de-8aec-df4abe9c345b';
        return dto;
    }
    public static crearGrupoDtoInvalido(): CrearGrupoDto {
        const dto = new CrearGrupoDto();
        dto.nombre = 'testInvalid';
        dto.idUsuario = 'c87eb4cb-0d04-49de-8aec-df4abe9c345c';
        return dto;
    }
    public static crearGrupoService(): CrearGrupoService {
 
        const repo : repositorioGrupoPrueba = new repositorioGrupoPrueba();
        return new CrearGrupoService(repo);
    }
}

export class repositorioGrupoPrueba implements RepositorioGrupo{
    async creargrupo(grupo: Grupo): Promise<Either<Grupo, Error>> {
        if(grupo.getIdUsuario() == "c87eb4cb-0d04-49de-8aec-df4abe9c345b"){
            return Either.makeLeft<Grupo, Error>(grupo);
        }
        else{
            return Either.makeRight<Grupo, Error>(new Error("Usuario no encontrado"));
        }
    }
    editarGrupo(grupo: EditarGrupoDto): Promise<Either<Grupo, Error>> {
        throw new Error("Method not implemented.");
    }
    eliminarGrupo(id: string): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    buscarGrupos(): Promise<Either<Iterable<Grupo>, Error>> {
        throw new Error("Method not implemented.");
    }
    buscarGrupoPorId(id: string): Promise<Either<Grupo, Error>> {
        throw new Error("Method not implemented.");
    }
    grupoAPapelera(grupo: GrupoAPapeleraDto): Promise<Either<Grupo, Error>> {
        throw new Error("Method not implemented.");
    }
    buscarGruposDeUsuario(idUsuarioDueno: string): Promise<Either<Iterable<Grupo>, Error>> {
        throw new Error("Method not implemented.");
    }
}