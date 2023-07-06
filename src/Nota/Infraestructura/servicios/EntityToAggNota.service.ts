/* eslint-disable prettier/prettier */
import { Nota } from 'src/Nota/Dominio/AgregadoNota';
import { IInfraestructureService } from 'src/core/domain/infService/IInfraestructureService';
import { EntidadNota } from '../entities/EntidadNota';
import { Either } from 'src/Utils/Either';
import { EstadoEnum } from 'src/Nota/Dominio/ValueObjectsNota/EstadoEnum';
import { Optional } from 'src/Utils/Opcional';

export class EntityToAggNotaService implements IInfraestructureService<Array<EntidadNota>, Array<Nota>> {
    
    
    execute(respuesta: Array<EntidadNota>): Either<Array<Nota>, Error> {
        
        const notas: Nota[] = respuesta.map((nota) => {

            let contenidoMapeado = new Optional<string>();

            if (nota.contenidos.length > 0) {

                const auxContenido = nota.contenidos.map((contenido) => {

                    //mapeamos lo que viene de la base de datos a los objetos de dominio
                    if (contenido.texto) {
                        return {
                            texto: {
                                cuerpo: contenido.texto.texto,
                                id: contenido.texto.id,
                            },
                            id: contenido.id,
                        }
                    }
                    if (contenido.tareas.length > 0) {
                        const tareas = contenido.tareas.map((tarea) => {
                            return{
                                    titulo: tarea.titulo,
                                    check: tarea.check,
                                    id: { 
                                        id : tarea.id
                                        },
                                };
                        });
                        return  {
                            tarea : {
                                value: tareas
                            },
                            id: contenido.id,
                        };
                    }
                    if (contenido.Imagen){
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

                const auxContenido2 = {
                    value: auxContenido,
                }

                contenidoMapeado = new Optional<any>(JSON.parse(JSON.stringify(auxContenido2)));
            }

            const nuevaNota = Nota.crearNota(
                    nota.titulo,
                    nota.fechaCreacion,
                    EstadoEnum[nota.estado],
                    nota.grupo,
                    new Optional<number>(nota.ubicacion.latitud),
                    new Optional<number>(nota.ubicacion.longitud),
                    contenidoMapeado,
                    nota.id,
                );
            return nuevaNota; 
        }
        );

        return Either.makeLeft(notas);
    }
}
