import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../Dominio/AgregadoNota";
import { Either } from "src/Utils/Either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { ModificarNotaDto } from "./dto/ModificarNota.dto";
import { VOImagen } from "../Dominio/ValueObjectsNota/VOImagen";
import { EstadoEnum } from "../Dominio/ValueObjectsNota/EstadoEnum";
import { Optional } from "src/Utils/Opcional";


export class ModificarNotaService implements IAplicationService<ModificarNotaDto,string>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        repositorioNota: RepositorioNota){
        
        this.repositorioNota = repositorioNota;
    }

    async execute(s: ModificarNotaDto): Promise<Either<string,Error>> {      
        
       const estado = EstadoEnum.GUARDADO;
    
    let im;

    if (s.imagenes) {
      console.log("entra");
      im = s.imagenes.map((i) => {
      return VOImagen.crearImagenNota(i.nombre, i.buffer); 
      });
    }

    let ncheck;
    let ntitulos;
    let nids;

    if (s.tareas){
       ncheck = s.tareas.map((t) => {
        return t.check;
      });

       ntitulos = s.tareas.map((t) => {
        return t.titulo;
      });
      nids = s.tareas.map((t) => {
        return t.id;
      });
    }


    //si hacemos un multipart las tareas se mandan como un string y hay que parsearlo

    const opLatitud = new Optional<number>(s.latitud);
    const opLongitud = new Optional<number>(s.longitud);

    const nota =  Nota.crearNota( //factory agregado
      s.titulo,
      s.contenido,
      null,
      estado,
      s.grupo,
      opLatitud,
      opLongitud,
      new Optional(ntitulos),
      new Optional(ncheck),
      new Optional(nids),
      s.id,
      im,
    );


        return await this.repositorioNota.updateNota(nota);
    }
}