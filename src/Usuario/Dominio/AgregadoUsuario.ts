/* eslint-disable prettier/prettier */
import { apellidoUsuario } from './value_objects/apellidoUsuario';
import { claveUsuario } from './value_objects/claveUsuario';
import { emailUsuario } from './value_objects/emailUsuario';
import { idUsuario } from './value_objects/idUsuario';
import { nombreUsuario } from './value_objects/nombreUsuario';
import { UsuarioCreadoEvent } from './eventos/UsuarioCreadoEvent';
import { AggregateRoot } from 'src/core/domain/agregados/AggregateRoot';


export class Usuario extends AggregateRoot {
  private id?: idUsuario;
  private nombre: nombreUsuario;
  private apellido: apellidoUsuario;
  private email: emailUsuario;
  private clave: claveUsuario;


  private constructor(
    nombre: nombreUsuario,
    apellido: apellidoUsuario,
    email: emailUsuario,
    clave: claveUsuario,
    id?: idUsuario,
  ) {
    super()
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.clave = clave;
    
  }

  static crearUsuario(
    nombre: string,
    apellido: string,
    email: string,
    clave: string,
    id?: string,
  ): Usuario {
    const usuario=new Usuario(
      nombreUsuario.crearNombreUsuario(nombre),
      apellidoUsuario.crearApellidoUsuario(apellido),
      emailUsuario.crearEmail(email),
      claveUsuario.createClave(clave), 
      idUsuario.crearIdUsuario(id)
    );
    const usuarioCreadoEvent = new UsuarioCreadoEvent(usuario.getId());
    usuario.addDomainEvent(usuarioCreadoEvent);
    
    return usuario;
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

  public getClave() : string {
    return this.clave.getValue();
  }

}
