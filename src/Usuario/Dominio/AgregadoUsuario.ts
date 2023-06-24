/* eslint-disable prettier/prettier */
import { apellidoUsuario } from './value_objects/apellidoUsuario';
import { claveUsuario } from './value_objects/claveUsuario';
import { emailUsuario } from './value_objects/emailUsuario';
import { idUsuario } from './value_objects/idUsuario';
import { nombreUsuario } from './value_objects/nombreUsuario';
import { UsuarioCreadoEvent } from './eventos/UsuarioCreadoEvent';
import { EventPublisher } from 'src/core/domain/events/EventPublisher';


export class Usuario {
  private id?: idUsuario;
  private nombre: nombreUsuario;
  private apellido: apellidoUsuario;
  private email: emailUsuario;
  private clave: claveUsuario;
  private suscripcion: boolean;
  private events: UsuarioCreadoEvent[];

  private constructor(
    nombre: nombreUsuario,
    apellido: apellidoUsuario,
    email: emailUsuario,
    clave: claveUsuario,
    suscripcion: boolean,
    id?: idUsuario,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.clave = clave;
    this.suscripcion = suscripcion;
    this.events = [];
    this.events.push(new UsuarioCreadoEvent(
    this.id ? this.id.getValue() : '',

    ));
    
  }

  static crearUsuario(
    nombre: string,
    apellido: string,
    email: string,
    clave: string,
    suscripcion: boolean,
    id?: string,
  ) {
    return new Usuario(
      nombreUsuario.crearNombreUsuario(nombre),
      apellidoUsuario.crearApellidoUsuario(apellido),
      emailUsuario.crearEmail(email),
      claveUsuario.createClave(clave), 
      suscripcion, 
      idUsuario.crearIdUsuario(id));
  }


  public getEvents(): UsuarioCreadoEvent[] {
    return this.events;
  }

  public getId(): string {          //getters del usuario 
    return this.id.getValue();
  }
  
  public getNombre():string {
    return this.nombre.getValue();
  }

  public getApellido(): string {
    return this.apellido.getValue();
  }

  public getEmail() : string {
    return this.email.getValue();
  }

  public isSuscribed() : boolean {
    return this.suscripcion;
  }

  public getClave() : string {
    return this.clave.getValue();
  }

}
