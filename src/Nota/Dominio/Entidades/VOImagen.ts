export class VOImagen {
  private nombre: string;
  private buffer: Buffer;

  private constructor(nombre: string, buffer: Buffer) {
    this.nombre = nombre;
    this.buffer = buffer;
  }

  static crearImagenNota(nombre: string, buffer: Buffer): VOImagen {
    return new VOImagen(nombre, buffer);
  }

  getNombreImagen(): string {
    return this.nombre;
  }

  getBufferImagen(): Buffer {
    return this.buffer;
  }
}
