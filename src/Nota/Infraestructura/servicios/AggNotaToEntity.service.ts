/* eslint-disable prettier/prettier */
import { IInfraestructureService } from 'src/core/domain/infService/IInfraestructureService';
import EntidadContenido from '../entities/EntidadContenido';
import { Either } from 'src/Utils/Either';
import { EntidadContenidoNota } from 'src/Nota/Dominio/Entidades/EntidadContenidoNota';
import EntidadTexto from '../entities/EntidadTexto';
import EntidadTarea from '../entities/EntidadTarea';
import EntidadImagen from '../entities/EntidadImagen';
import { EntidadTareaNota } from 'src/Nota/Dominio/Entidades/EntidadTarea';
import { Nota } from 'src/Nota/Dominio/AgregadoNota';
import { EntidadUbicacion } from '../entities/EntidadUbicacion';
import { EntidadNota } from '../entities/EntidadNota';
import { IContenidoNota } from 'src/Nota/Dominio/Entidades/IContenidoNota';


export class AggNotaToEntityService implements IInfraestructureService<Nota, EntidadNota>
{
    
    execute(nota: Nota): Either<EntidadNota, Error> {

        let ub;
        if (nota.existeUbicacion()) {
            ub = new EntidadUbicacion();
            ub.latitud = nota.getUbicacion().get('latitud')
            ub.longitud = nota.getUbicacion().get('longitud');
        }

        const entidadNota = new EntidadNota(); //entity del orm
        entidadNota.id = nota.getId();
        entidadNota.titulo = nota.getTitulo();
        entidadNota.fechaCreacion = nota.getFechaCreacion();
        entidadNota.estado = nota.getEstado();
        entidadNota.ubicacion = ub;
        entidadNota.grupo = nota.getIdGrupo();

        if (nota.existeContenido()) {

            const contenido = nota.getContenido() as Array<IContenidoNota>;

            //parseamos los contenidos del agregado Nota a el entity del orm
            const auxcontenido = contenido.map((contenido) => {
                const c = new EntidadContenido();
                const contenidoAux = JSON.parse(contenido.toJSON());

                //este parseo debe ser un servicio aparte || De agregado a entity
                if (contenidoAux.texto) {
                    const t = new EntidadTexto();
                    const txt = {"texto": contenidoAux.texto.texto}
                    t.texto = JSON.stringify(txt);
                    c.orden = contenidoAux.orden;
                    c.id = contenidoAux.id;
                    c.contenido = txt;
                }
                if (contenidoAux.tareas) {
                    const t = new Array<EntidadTarea>();
                    for (const tarea of contenidoAux.tareas) {
                        const ta = new EntidadTarea();
                        ta.titulo = tarea.titulo.titulo;
                        ta.check = tarea.check;
                        ta.id = tarea.id;
                        t.push(ta);
                    }
                    const auxtarea = {"tareas": t};
                    c.orden = contenidoAux.orden;
                    c.id = contenidoAux.id;
                    c.contenido = auxtarea;
                }
                if (contenidoAux.imagen) {
                    const i = new EntidadImagen();
                    i.nombre = contenidoAux.imagen.nombre;
                    i.buffer = contenidoAux.imagen.buffer;
                    c.orden = contenidoAux.orden;
                    c.id = contenidoAux.id;
                    const auximagen = {"Imagen": i};
                    c.contenido = auximagen;
                }
                c.nota = entidadNota;
                return c;
            }); 

            entidadNota.contenidos = auxcontenido;
        } else {
            entidadNota.contenidos = [];
        }

    return Either.makeLeft(entidadNota);
  }

}
