import { error } from 'console';
import { colorEtiqueta } from './ValueObjectsEtiqueta/colorEtiqueta';
import { idEtiqueta } from './ValueObjectsEtiqueta/idEtiqueta';
import { idUsuario } from 'src/Usuario/Dominio/value_objects/idUsuario'; 
import { nombreEtiqueta } from './ValueObjectsEtiqueta/nombreEtiqueta';
import { Optional } from 'src/Utils/Opcional';

export class Etiqueta {
  private id: idEtiqueta;
  private nombre: nombreEtiqueta;
  private color: colorEtiqueta;
  private usuarioId: idUsuario;

  private constructor(
    nombre: nombreEtiqueta,
    color: colorEtiqueta,
    usuarioId: idUsuario,
    id?: idEtiqueta,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.color = color;
    this.usuarioId = usuarioId;
  }

  static crearEtiqueta(
    nombre: string,
    color: colorEtiqueta,
    usuarioId: string,
    id?: string,
  ): Etiqueta {
    return new Etiqueta(
      nombreEtiqueta.crearNombreEtiqueta(nombre),
      colorEtiqueta[color],

      idUsuario.crearIdUsuario(usuarioId),

      idEtiqueta.crearIdEtiqueta(id),
    );
  }

  public getId(): string {
    return this.id.getValue();
  }

  public getNombre(): string {
    return this.nombre.getNombreEtiqueta();
  }

  public getColor(): string {
    return this.color.toString();
  }

  public getUsuarioId(): string {
    return this.usuarioId.getValue();
  }

  public setColor(color: colorEtiqueta): void {
    this.color = color;
  }

  public setNombre(nombre: nombreEtiqueta): void {
    this.nombre = nombre;
  }

  public setId(id: idEtiqueta): void {
    this.id = id;
  }

  public setUsuarioId(usuarioId: idUsuario): void {
    this.usuarioId = usuarioId;
  }
}
