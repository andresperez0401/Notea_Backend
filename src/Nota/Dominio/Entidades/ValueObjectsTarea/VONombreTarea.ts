export class VOTituloTarea {
  private titulo: string;

  private constructor(titulo: string) {
    this.titulo = titulo;
  }

  static crearTituloTarea(titulo: string): VOTituloTarea {
    return new VOTituloTarea(titulo);
  }

  getTituloTarea(): string {
    return this.titulo;
  }
}
