import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrearGrupoService } from "src/Grupo/Aplicacion/crearGrupoService";
import { CrearGrupoDto } from "src/Grupo/Aplicacion/dto/CrearGrupo.dto";
import { RepositorioGrupo } from "src/Grupo/Dominio/RepositorioGrupo";
import { EntidadGrupo } from "src/Grupo/Infraestructura/entities/EntidadGrupo";
import { RepositorioGrupoImp } from "src/Grupo/Infraestructura/repository/RepositorioGrupoImpl";
import { EntidadNota } from "src/Nota/Infraestructura/entities/EntidadNota";
import { EntidadUsuario } from "src/Usuario/Infraestructura/entities/EntidadUsuario";
import { Either } from "src/Utils/Either";
import { Repository } from "typeorm";


export class CrearGrupoPrueba {
    @Inject(RepositorioGrupoImp)
    static repositorioGrupo: RepositorioGrupo;

    

    constructor(
        @InjectRepository(EntidadGrupo)
        private readonly grupoRepo: Repository<EntidadGrupo>,
        @InjectRepository(EntidadNota)
        private readonly notaRepo: Repository<EntidadNota>,
        @InjectRepository(EntidadUsuario)
        private readonly repoUsuario: Repository<EntidadUsuario>,
      ) {
        CrearGrupoPrueba.repositorioGrupo = new RepositorioGrupoImp(this.grupoRepo, this.notaRepo, this.repoUsuario);
      }
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
 
        return new CrearGrupoService(this.repositorioGrupo);
    }
}