/* eslint-disable prettier/prettier */
import { Nota } from 'src/Nota/Dominio/AgregadoNota';
import { IInfraestructureService } from 'src/core/domain/infService/IInfraestructureService';
import { EntidadNota } from '../entities/EntidadNota';
import { Either } from 'src/Utils/Either';
import { EstadoEnum } from 'src/Nota/Dominio/ValueObjectsNota/EstadoEnum';
import { Optional } from 'src/Utils/Opcional';

export class EntityToStringService implements IInfraestructureService<Array<EntidadNota>, Array<string>> {


    execute(respuesta: Array<EntidadNota>): Either<Array<string>, Error> {

        const notas: Array<string> = respuesta.map((nota) => {

            let contenidoMapeado;

            if (nota.contenidos.length > 0) {

                const auxContenido = nota.contenidos.map((contenido) => {

                    const auxc = JSON.parse(JSON.stringify(contenido.contenido));
                    
                    //mapeamos lo que viene de la base de datos a los objetos de dominio
                    if (auxc.texto) {
                        return {
                            id: contenido.id,
                            orden: contenido.orden,
                            texto: {
                                cuerpo: auxc.texto,
                            },
                        }
                    }
                    if (auxc.tareas) {
                        const tareas = auxc.tareas.map((tarea) => {
                            return {
                                titulo: tarea.titulo,
                                check: tarea.check,
                                id: {
                                    id: tarea.id
                                },
                            };
                        });
                        return {
                            id: contenido.id,
                            orden: contenido.orden,
                            tareas: {
                                value: tareas
                            },
                        };
                    }
                    if (auxc.Imagen) {
                        return {
                            id: contenido.id,
                            orden: contenido.orden,
                            imagen: {
                                nombre: auxc.Imagen.nombre,
                                buffer: auxc.Imagen.buffer.toString(),
                            },
                        };
                    }
                    return contenido;
                });

                contenidoMapeado = auxContenido;
            }

            let ubicacion;
            if (nota.ubicacion) {
                    ubicacion = {
                        latitud: nota.ubicacion.latitud,
                        longitud: nota.ubicacion.longitud,
                    };
            }
            let etiquetas;
            if (nota.etiquetas) {
                etiquetas = nota.etiquetas.map((etiqueta) => {
                    return etiqueta.id;
                });
            }

            const nuevaNota = {
                titulo: nota.titulo,
                fechaCreacion: nota.fechaCreacion,
                estado: EstadoEnum[nota.estado],
                grupo: nota.grupo,
                ubicacion,
                etiquetas,
                contenido: contenidoMapeado,
                id: nota.id,
            }
            
            return JSON.parse(JSON.stringify(nuevaNota));
        });

        return Either.makeLeft(notas);
    }
}
