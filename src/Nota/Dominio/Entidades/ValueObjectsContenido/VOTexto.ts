export class VOTexto {
  private texto: string;

  private constructor(texto: string) {
    this.texto = texto;
  }

  static crearTexto(texto: string): VOTexto {
    if (texto.length > 500) {
      texto = texto.substring(0, 500);
    }
    return new VOTexto(texto);
  }

  getTexto(): string {
    return this.texto;
  }
}
