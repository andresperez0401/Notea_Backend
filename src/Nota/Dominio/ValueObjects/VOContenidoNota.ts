export class VOContenidoNota {
  private contenido: string; //html

  private constructor(contenido: string) {
    this.contenido = contenido;
  }

  static crearContenidoNota(contenido: string): VOContenidoNota {
    return new VOContenidoNota(contenido);
  }

  getContenidoNota(): string {
    return this.contenido;
  }
}
