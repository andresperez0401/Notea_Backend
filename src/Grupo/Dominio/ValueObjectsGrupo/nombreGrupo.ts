export class nombreGrupo {
    private nombre: string;
  
    private constructor(nombreGrupo: string) {
      this.nombre = nombreGrupo;
    }
  
    static crearNombreGrupo(nombre: string): nombreGrupo {
      return new nombreGrupo(nombre);
    }
  
    getNombreGrupo(): string {
      return this.nombre;
    }
  }