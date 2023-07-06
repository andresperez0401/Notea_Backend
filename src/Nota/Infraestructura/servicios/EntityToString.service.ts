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

                    //mapeamos lo que viene de la base de datos a los objetos de dominio
                    if (contenido.texto) {
                        return {
                            texto: {
                                cuerpo: contenido.texto.texto,
                                id: contenido.texto.id, //texto puede dejar de ser una Entidad y pasar a ser un ValueObject
                                                        //por lo tanto puede dejar de tener id
                            },
                            id: contenido.id,
                        }
                    }
                    if (contenido.tareas.length > 0) {
                        const tareas = contenido.tareas.map((tarea) => {
                            return {
                                titulo: tarea.titulo,
                                check: tarea.check,
                                id: {
                                    id: tarea.id
                                },
                            };
                        });
                        return {
                            tarea: {
                                value: tareas
                            },
                            id: contenido.id,
                        };
                    }
                    if (contenido.Imagen) {
                        return {
                            imagen: {
                                nombre: contenido.Imagen.nombre,
                                buffer: contenido.Imagen.buffer.toString(),
                            },
                            id: contenido.id,
                        };
                    }
                    return contenido;
                });

                contenidoMapeado = auxContenido;
            }

            const nuevaNota = {
                titulo: nota.titulo,
                fechaCreacion: nota.fechaCreacion,
                estado: EstadoEnum[nota.estado],
                grupo: nota.grupo,
                ubicacion: {
                    latitud: nota.ubicacion.latitud,
                    longitud: nota.ubicacion.longitud,
                },
                contenido: contenidoMapeado,
                id: nota.id,
            }
            
            return JSON.parse(JSON.stringify(nuevaNota));
        });
        console.log(notas);

        return Either.makeLeft(notas);
    }
}
