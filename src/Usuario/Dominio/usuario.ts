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
}
