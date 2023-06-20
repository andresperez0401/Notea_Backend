export class nombreEtiqueta {
    private nombre: string;
  
    private constructor(nombreEtiq: string) {
      this.nombre = nombreEtiq;
    }
  
    static crearNombreEtiqueta(titulo: string): nombreEtiqueta {
      return new nombreEtiqueta(titulo);
    }
  
    getNombreEtiqueta(): string {
      return this.nombre;
    }
  }