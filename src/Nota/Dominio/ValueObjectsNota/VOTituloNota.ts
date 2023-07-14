export class VOTituloNota {
  private titulo: string;

  private constructor(titulo: string) {
    this.titulo = titulo;
  }

  static crearTituloNota(titulo: string): VOTituloNota {
    if (titulo.length > 20) {
      titulo = titulo.substring(0, 20);
    }
    return new VOTituloNota(titulo);
  }

  getTituloNota(): string {
    return this.titulo;
  }
}
