import { Usuario } from "../AgregadoUsuario";

export class UsuarioCreadoEvent {
  constructor(
    private readonly idUsuario: string,

  ) {}

  // Debe tener un método getter para obtener el idUsuario
  public getIdUsuario(): string {
    return this.idUsuario;
  }


}
