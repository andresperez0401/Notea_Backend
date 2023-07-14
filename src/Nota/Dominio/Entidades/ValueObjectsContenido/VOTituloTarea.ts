export class VOTituloTarea {
  private titulo: string;

  private constructor(titulo: string) {
    this.titulo = titulo;
  }

  static crearTituloTarea(titulo: string): VOTituloTarea {
    if (titulo.length > 30) {
      titulo = titulo.substring(0, 30);
    }
    return new VOTituloTarea(titulo);
  }

  getTituloTarea(): string {
    return this.titulo;
  }
}
