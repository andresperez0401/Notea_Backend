/* eslint-disable prettier/prettier */
import { EntidadTareaNota } from './EntidadTarea';
import { VOImagen } from './VOImagen';
import { IdContenidoNota } from './ValueObjectsContenido/IdContenidoNota';
import { Optional } from 'src/Utils/Opcional';
import { EntidadTextoNota } from './EntidadTextoNota';

export class EntidadContenidoNota {
  private id: IdContenidoNota;
  private texto: Optional<EntidadTextoNota>;
  private tareas: Optional<Array<EntidadTareaNota>>;
  private imagen: Optional<VOImagen>;
  private orden: number;
  private isImagen = false;
  private isTareas = false;

  private constructor(id: IdContenidoNota, texto: Optional<EntidadTextoNota>,
    tareas: Optional<Array<EntidadTareaNota>>, imagen: Optional<VOImagen>, orden: number) {
    this.id = id;
    this.orden = orden;
    this.texto = new Optional<EntidadTextoNota>();
    this.tareas = new Optional<Array<EntidadTareaNota>>();
    this.imagen = new Optional<VOImagen>();

    if (tareas.hasvalue()) {
      this.tareas = tareas;
      this.isTareas = true;
    } else if (imagen.hasvalue()) {
      this.imagen = imagen;
      this.isImagen = true;
    } else if (texto.hasvalue()) {
      this.texto = texto;
    }
  }

  

  //al ser un metodo factory
  static crearContenidoNota(
    contenidoTexto: Optional<string>,
    idTextoNota: Optional<string>,
    contenidoTareas: Optional<Array<string>>,
    checkTareas: Optional<Array<boolean>>,
    idTareas: Optional<Array<string>>,
    bufferImagen: Optional<Buffer>,
    nombreImagen: Optional<string>,
    orden: number,
    id?: string,
  ): EntidadContenidoNota {

    let entidadTN = new Optional<EntidadTextoNota>();
    let entidadTareas = new Optional<Array<EntidadTareaNota>>();
    let entidadImagen = new Optional<VOImagen>();

    if (contenidoTexto.hasvalue()) { //dependiendo de que tenga valor, se crea el objeto correspondiente
      entidadTN = new Optional(EntidadTextoNota.crearTextoNota(contenidoTexto.getValue(), idTextoNota.getValue()));
    } else if (contenidoTareas.hasvalue()) {
      const tareas = new Array<EntidadTareaNota>();
      for (let i = 0; i < contenidoTareas.getValue().length; i++) {
        tareas.push(EntidadTareaNota.crearTareaNota(contenidoTareas.getValue()[i], checkTareas.getValue()[i], idTareas.getValue()[i]));
      }
      entidadTareas = new Optional(tareas);
    } else if (nombreImagen.hasvalue()) {
      entidadImagen = new Optional(VOImagen.crearImagenNota(nombreImagen.getValue(), bufferImagen.getValue(),));
    }

    return new EntidadContenidoNota(
      IdContenidoNota.crearIdContenidoNota(id),
      entidadTN,
      entidadTareas,
      entidadImagen,
      orden,
    );
  }


  static crearContenidoNotaFromJson(contenido: any): Optional<Array<EntidadContenidoNota>> {

    let opContenido = new Optional<Array<EntidadContenidoNota>>();
    let contenidoAux: Array<EntidadContenidoNota>;
    if (contenido.hasvalue()) {
      console.log("tiene value");
      contenidoAux = new Array<EntidadContenidoNota>();

      contenido.getValue().value.forEach(contenido => {
        let entidadTN = new Optional<EntidadTextoNota>(); //inicializamos los objetos vacios
        let entidadTareas = new Optional<Array<EntidadTareaNota>>();
        let entidadImagen = new Optional<VOImagen>();

        if (contenido.texto) { //agregamos el valor si tiene
          if (contenido.texto.id)
            entidadTN = new Optional(EntidadTextoNota.crearTextoNota(contenido.texto.cuerpo, contenido.texto.id.id));
          else
            entidadTN = new Optional(EntidadTextoNota.crearTextoNota(contenido.texto.cuerpo));
        }
        if (contenido.tarea) {
          const tareas = new Array<EntidadTareaNota>();
          for (let i = 0; i < contenido.tarea.value.length; i++) {
            tareas.push(EntidadTareaNota.crearTareaNota(contenido.tarea.value[i].titulo, contenido.tarea.value[i].check, contenido.tarea.value[i].id.id));
          }
          entidadTareas = new Optional(tareas);
        }
        if (contenido.imagen) {
          entidadImagen = new Optional(VOImagen.crearImagenNota(contenido.imagen.nombre, contenido.imagen.buffer));
        }

        ////////////
        let id: string; //ARREGLAR
        if (contenido.id) {
          id = contenido.id.id;
        } else {
          id = undefined;
        }

        contenidoAux.push(new EntidadContenidoNota( //agregamos el objeto al array
          IdContenidoNota.crearIdContenidoNota(contenido.id),
          entidadTN,
          entidadTareas,
          entidadImagen,
          contenido.orden,
        ));
      });
      opContenido = new Optional<Array<EntidadContenidoNota>>(contenidoAux);
    } 

    return opContenido;
  }

  public getId(): IdContenidoNota {
    return this.id;
  }

  public isTexto(): boolean {
    return this.texto.hasvalue();
  }

  public isTareass(): boolean {
    return this.isTareas;
  }

  public isImagenn(): boolean {
    return this.isImagen;
  }

  public getTareas(): Iterable<EntidadTareaNota> {
    return this.tareas.getValue();
  }

  public getTareasCompletadas(): number {
    let completadas = 0;
    for (const tarea of this.tareas.getValue()) {
      if (tarea.isCompletada()) {
        completadas++;
      }
    }
    return completadas;
  }

  public getOrden(): number {
    return this.orden;
  }

  public getImagen(): VOImagen {
    return this.imagen.getValue();
  }

  public getTexto(): EntidadTextoNota {
    return this.texto.getValue();
  }

}
