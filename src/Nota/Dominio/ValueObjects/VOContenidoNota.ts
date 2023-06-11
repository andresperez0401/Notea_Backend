export class VOContenidoNota {
  private contenido: string; //html

  constructor(contenido: string) {
    this.contenido = contenido;
  }

  getContenidoNota(): string {
    return this.contenido;
  }
}
