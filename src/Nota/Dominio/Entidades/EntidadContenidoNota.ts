/* eslint-disable prettier/prettier */
import { EntidadTarea } from './EntidadTarea';
import { VOImagen } from './VOImagen';
import { IdContenidoNota } from './IdContenidoNota';
import { Optional } from 'src/Utils/Opcional';
import { EntidadTextoNota } from './EntidadTextoNota';
import { EstiloEnum } from '../ValueObjectsNota/EstiloEnum';

export class EntidadContenidoNota {
  private id: IdContenidoNota;
  private texto: Optional<EntidadTextoNota>;
  private tareas: Optional<Array<EntidadTarea>>;
  private imagen: Optional<VOImagen>;
  private isImagen = false;
  private isTareas = false;

  private constructor(id: IdContenidoNota, texto: Optional<EntidadTextoNota>, 
    tareas: Optional<Array<EntidadTarea>>, imagen: Optional<VOImagen>) {
    this.id = id;
    if (tareas.hasvalue){
      this.tareas = tareas;
      this.isTareas = true;
    } else if (imagen.hasvalue){
      this.imagen = imagen;
      this.isImagen = true;
    } else if (texto.hasvalue){
      this.texto = texto;
    }
  }

  //al ser un metodo factory
  static crearContenidoNota(
    contenidoTexto: Optional<string>,
    formatoTexto: Optional<Array<string>>,
    idTextoNota: Optional<string>,
    contenidoTareas: Optional<Array<string>>,
    checkTareas: Optional<Array<boolean>>,
    idTareas: Optional<Array<string>>,
    bufferImagen: Optional<Buffer>,
    nombreImagen: Optional<string>,
    id?: string,
  ): EntidadContenidoNota {

    let entidadTN = new Optional<EntidadTextoNota>();
    let entidadTareas = new Optional<Array<EntidadTarea>>();
    let entidadImagen = new Optional<VOImagen>();

    if (contenidoTexto.hasvalue()) { //dependiendo de que tenga valor, se crea el objeto correspondiente
      entidadTN = new Optional(EntidadTextoNota.crearTextoNota(contenidoTexto.getValue(), formatoTexto.getValue(), idTextoNota.getValue()));
    } else if (contenidoTareas.hasvalue()) {
      const tareas = new Array<EntidadTarea>();
      for (let i = 0; i < contenidoTareas.getValue().length; i++) {
        tareas.push(EntidadTarea.crearTareaNota(contenidoTareas.getValue()[i], checkTareas.getValue()[i], idTareas.getValue()[i]));
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
    );
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

  public getTareas(): Array<EntidadTarea> {
    return this.tareas.getValue();
  }

  public getImagen(): VOImagen {
    return this.imagen.getValue();
  }

  public getTexto(): EntidadTextoNota {
    return this.texto.getValue();
  }

}
