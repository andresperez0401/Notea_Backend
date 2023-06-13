export class VOTituloNota {
  private titulo: string;

  private constructor(titulo: string) {
    this.titulo = titulo;
  }

  static crearTituloNota(titulo: string): VOTituloNota {
    return new VOTituloNota(titulo);
  }

  getTituloNota(): string {
    return this.titulo;
  }
}
