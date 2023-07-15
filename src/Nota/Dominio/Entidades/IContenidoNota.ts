/* eslint-disable prettier/prettier */
import { Optional } from 'src/Utils/Opcional';
import { IdContenidoNota } from './ValueObjectsContenido/IdContenidoNota';
import { IdTarea } from './ValueObjectsTarea/idTarea';
import { VOTexto } from './ValueObjectsContenido/VOTexto';
import { VOTituloTarea } from './ValueObjectsContenido/VOTituloTarea';
import { VOImagen } from './VOImagen';

interface IContenidoNota {
  id: IdContenidoNota;
  orden: number;

  toJSON(): string;
  getOrden(): number;
  getId(): string;
}
export { IContenidoNota };

class EntidadTextoNotaa implements IContenidoNota{
    id: IdContenidoNota;
    orden: number;
    texto: VOTexto;

    constructor(id: IdContenidoNota, orden: number, texto: VOTexto){
        this.id = id;
        this.orden = orden;
        this.texto = texto;
    }

    static crearTextoNota(texto: string, orden: number, id?: string): EntidadTextoNotaa {
        return new EntidadTextoNotaa(
            IdContenidoNota.crearIdContenidoNota(id),
            orden,
            VOTexto.crearTexto(texto),
        )
    }

    toJSON(): string{
        const json = {
            id : this.id.getValue(),
            orden: this.orden,
            texto: this.texto,
        }
        return JSON.stringify(json);
    }

    getId(): string {
        return this.id.getValue();
    }

    getOrden(): number {
        return this.orden;
    }
}
export { EntidadTextoNotaa };

class Tarea {
    id: IdTarea;
    titulo: VOTituloTarea;
    check: boolean;

    constructor(id: IdTarea, titulo: VOTituloTarea, check: boolean) {
        this.id = id;
        this.titulo = titulo;
        this.check = check;
    }

    static crearTarea(titulo: string, check: boolean, id?: string): Tarea {
        return new Tarea(
            IdTarea.crearIdTarea(id),
            VOTituloTarea.crearTituloTarea(titulo),
            check,
        )
    }
}

class EntidadTareasNotaa implements IContenidoNota{
    id: IdContenidoNota;
    orden: number;
    tareas: Array<Tarea>;

    constructor(id: IdContenidoNota, orden: number, tareas: Array<Tarea>) {
        this.id = id;
        this.orden = orden;
        this.tareas = tareas;
    }

    //factory para crear un array de tareas a partir de sus primitivos
    static crearTareasNota(
        tareas: Array<Tarea>,
        orden: number,
        id?: string,
    ): EntidadTareasNotaa {
        return new EntidadTareasNotaa(
            IdContenidoNota.crearIdContenidoNota(id),
            orden,
            tareas,
        )
    }

    toJSON(): string {
        const tareas = [];
        this.tareas.forEach((tarea) => {
            const json = {
                id: tarea.id.getValue(),
                titulo: tarea.titulo,
                check: tarea.check,
            }
            tareas.push(json);
        })
        const json = {
            id: this.id.getValue(),
            orden: this.orden,
            tareas: tareas,
        }
        return JSON.stringify(json);
    }

    getId(): string {
        return this.id.getValue();
    }

    getOrden(): number {
        return this.orden;
    }

}
export { EntidadTareasNotaa };

class EntidadImagenNotaa implements IContenidoNota{
    id: IdContenidoNota;
    orden: number;
    imagen: VOImagen;

    constructor(id: IdContenidoNota, orden: number, imagen: VOImagen) {
        this.id = id;
        this.orden = orden;
        this.imagen = imagen;
    }

    static crearImagenNota(nombre: string, buffer: Buffer, orden: number, id?: string): EntidadImagenNotaa {
        return new EntidadImagenNotaa(
            IdContenidoNota.crearIdContenidoNota(id),
            orden,
            VOImagen.crearImagenNota(nombre, buffer),
        )
    }

    toJSON(): string {
        const json = {
            id: this.id.getValue(),
            orden: this.orden,
            imagen: {
                nombre: this.imagen.getNombreImagen(),
                buffer: this.imagen.getBufferImagen(),
            }
        }
        return JSON.stringify(json);
    }

    getId(): string {
        return this.id.getValue();
    }

    getOrden(): number  {
        return this.orden;
    }
}
export { EntidadImagenNotaa };

class FabricaContenido {
    static crearContenidoNotaFromJson(contenido: any): Optional<Array<IContenidoNota>> {
        console.log('hola');

        let opContenido = new Optional<Array<IContenidoNota>>();
        let contenidoAux: Array<IContenidoNota>;
        if (contenido.hasvalue()) {
            contenidoAux = new Array<IContenidoNota>();
            contenido.getValue().value.forEach(contenido => {

                if (contenido.texto) { //agregamos el valor si tiene
                    if (contenido.id)
                        contenidoAux.push(EntidadTextoNotaa.crearTextoNota(contenido.texto.cuerpo, contenido.orden, contenido.id));
                    else
                        contenidoAux.push(EntidadTextoNotaa.crearTextoNota(contenido.texto.cuerpo, contenido.orden));
                }
                if (contenido.tarea) {
                    const tareas = new Array<Tarea>();
                    for (let i = 0; i < contenido.tarea.value.length; i++) {
                        if (contenido.tarea.value[i].id) {
                            tareas.push(Tarea.crearTarea(contenido.tarea.value[i].titulo, contenido.tarea.value[i].check, contenido.tarea.value[i].id.id));
                        } else {
                        tareas.push(Tarea.crearTarea(contenido.tarea.value[i].titulo, contenido.tarea.value[i].check));
                        }
                    }
                    contenidoAux.push(EntidadTareasNotaa.crearTareasNota(tareas, contenido.orden, contenido.id));
                }
                if (contenido.imagen) {
                    contenidoAux.push(EntidadImagenNotaa.crearImagenNota(contenido.imagen.nombre, contenido.imagen.buffer, contenido.orden, contenido.id));
                }

                ////////////
                // let id: string; //id de la entidadContenidoNota
                // if (contenido.id) {
                //     id = contenido.id;
                // }
            });
            opContenido = new Optional<Array<IContenidoNota>>(contenidoAux);
        } else {
            opContenido = new Optional<Array<IContenidoNota>>(contenidoAux);
        }

        return opContenido;
    }
}
export { FabricaContenido };