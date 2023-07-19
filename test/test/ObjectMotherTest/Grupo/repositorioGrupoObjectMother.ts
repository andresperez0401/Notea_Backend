import { RepositorioGrupo } from "src/Grupo/Dominio/RepositorioGrupo";
import { EntidadGrupo } from "src/Grupo/Infraestructura/entities/EntidadGrupo";
import { RepositorioGrupoImp } from "src/Grupo/Infraestructura/repository/RepositorioGrupoImpl";
import { EntidadNota } from "src/Nota/Infraestructura/entities/EntidadNota";
import { EntidadUsuario } from "src/Usuario/Infraestructura/entities/EntidadUsuario";
import { Repository } from "typeorm";
import { Grupo } from "src/Grupo/Dominio/AgregadoGrupo";
import { Inject } from "@nestjs/common";

export class RepositorioGrupoPruebaObjectMother{

    @Inject(EntidadUsuario)
    public static repoUsuario: Repository<EntidadUsuario>;

    @Inject(EntidadGrupo)
    public static repoGrupo: Repository<EntidadGrupo>;

    @Inject(EntidadNota)
    public static repoNota: Repository<EntidadNota>;
   
        

    public static async obtenerRepositorioGrupo(): Promise<RepositorioGrupo>{
        
        return new RepositorioGrupoImp(this.repoGrupo, this.repoNota, this.repoUsuario);
    }

    public static crearGupoConIdUsuarioExistente() : Grupo {
        const grupo = Grupo.crearGrupo("test", "c87eb4cb-0d04-49de-8aec-df4abe9c345b");
        return grupo;
    }

    public static crearGrupoIdUsuarioInexistente() : Grupo {
        const grupo = Grupo.crearGrupo("test", "c87eb4cb-0d04-49de-8aec-df4abe9c345b");
        return grupo;
    }


}