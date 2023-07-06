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

            const contenido = nota.getContenido() as Array<EntidadContenidoNota>;

            //parseamos los contenidos del agregado Nota a el entity del orm
            const auxcontenido = contenido.map((contenido) => {
                const c = new EntidadContenido();
                c.id = contenido.getId().getValue();

                //este parseo debe ser un servicio aparte || De agregado a entity
                if (contenido.isTexto()) {
                    const t = new EntidadTexto();
                    t.texto = contenido.getTexto().getTexto();
                    t.id = contenido.getTexto().getId();
                    t.contenido = c;
                    c.texto = t;
                }
                if (contenido.isTareass()) {
                    const caux = contenido.getTareas() as Array<EntidadTareaNota>;
                    const entTareas = caux.map((tarea) => {
                        const t = new EntidadTarea();
                        t.id = tarea.getId();
                        t.titulo = tarea.getTitulo();
                        t.check = tarea.getCheck();
                        t.contenido = c;
                        return t;
                    });
                    c.tareas = entTareas;
                }
                if (contenido.isImagenn()) {
                    const i = new EntidadImagen();
                    i.nombre = contenido.getImagen().getNombreImagen();
                    i.buffer = contenido.getImagen().getBufferImagen();
                    i.contenido = c;
                    c.Imagen = i;
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
