import { idUsuario } from "src/Usuario/Dominio/value_objects/idUsuario";
import { idGrupo } from "./ValueObjectsGrupo/idGrupo";
import { nombreGrupo } from "./ValueObjectsGrupo/nombreGrupo";


export class Grupo {
    private id: idGrupo;
    private nombre: nombreGrupo;
    private usuario: idUsuario;
    
  
    private constructor(nombre: nombreGrupo, idUser: idUsuario, id?: idGrupo){
      this.id = id;
      this.nombre = nombre;
      this.usuario = idUser;
    }
  
    static crearGrupo(nombre: string, idUser: string, id?: string,): Grupo {
      return new Grupo(
          nombreGrupo.crearNombreGrupo(nombre),
          idUsuario.crearIdUsuario(idUser),
          idGrupo.crearIdGrupo(id)
      );
    }
}