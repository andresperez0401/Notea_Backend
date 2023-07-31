/* eslint-disable prettier/prettier */
import EntidadContenido from '../entities/EntidadContenido';
import { Either } from 'src/Utils/Either';
import EntidadTarea from '../entities/EntidadTarea';
import EntidadImagen from '../entities/EntidadImagen';
import { Nota } from 'src/Nota/Dominio/AgregadoNota';
import { EntidadUbicacion } from '../entities/EntidadUbicacion';
import { EntidadNota } from '../entities/EntidadNota';
import { IContenidoNota } from 'src/Nota/Dominio/Entidades/IContenidoNota';
import { entidadEtiqueta } from 'src/Etiqueta/Infraestructura/entities/entidadEtiqueta';
import { IInfraestructureService } from 'src/core/domain/infService/IInfraestructureService';
import EntidadTexto from '../entities/EntidadTexto';


export class AggNotaToEntityService implements IInfraestructureService<Nota, EntidadNota>
{
    
    execute(nota: Nota): Either<EntidadNota, Error> {

        let ub;
        if (nota.existeUbicacion()) {
            ub = new EntidadUbicacion();
            ub.latitud = nota.getUbicacion().get('latitud')
            ub.longitud = nota.getUbicacion().get('longitud');
        }
        let etiquetas;
        if (nota.existeEtiquetas()) {
            etiquetas = nota.getEtiquetas().map((etiqueta) => {
                const e = new entidadEtiqueta();
                e.id = etiqueta
                return e;
            });
        }
        //al ser una relacion muchos a muchos con etiquetas debemos buscar las etiquetas en la base de datos
        //let servicio = new buscarEtiquetasService();

        const entidadNota = new EntidadNota(); //entity del orm
        entidadNota.id = nota.getId();
        entidadNota.titulo = nota.getTitulo();
        entidadNota.fechaCreacion = nota.getFechaCreacion();
        entidadNota.estado = nota.getEstado();
        entidadNota.ubicacion = ub;
        entidadNota.etiquetas = etiquetas;
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
