import { apellidoUsuario } from './value_objects/apellidoUsuario';
import { claveUsuario } from './value_objects/claveUsuario';
import { emailUsuario } from './value_objects/emailUsuario';
import { idUsuario } from './value_objects/idUsuario';
import { nombreUsuario } from './value_objects/nombreUsuario';

export class Usuario {
  private id?: idUsuario;
  private nombre: nombreUsuario;
  private apellido: apellidoUsuario;
  private email: emailUsuario;
  private clave: claveUsuario;
  private suscripcion: boolean;

  private constructor(
    nombre: nombreUsuario,
    apellido: apellidoUsuario,
    email: emailUsuario,
    clave: claveUsuario,
    suscripcion: boolean,
    id?: idUsuario,
  ) {
    if (id !== undefined) {
      this.id = id;
    } else {
      this.id = new idUsuario();
    }
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.clave = clave;
    this.suscripcion = suscripcion;
  }

  static crearUsuario(
    nombre: nombreUsuario,
    apellido: apellidoUsuario,
    email: emailUsuario,
    clave: claveUsuario,
    suscripcion: boolean,
    id?: idUsuario,
  ) {
    return new Usuario(nombre, apellido, email, clave, suscripcion, id);
  }

  public getId(): string {
    //getters del usuario
    return this.id.getValue();
  }

  public getNombre(): string {
    return this.nombre.getValue();
  }

  public getApellido(): string {
    return this.apellido.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public isSuscribed(): boolean {
    return this.suscripcion;
  }

  public getClave(): string {
    return this.clave.getValue();
  }
}
