export class VOubicacionNota {
  private latitud: number;
  private longitud: number;

  constructor(latitud: number, longitud: number) {
    this.latitud = latitud;
    this.longitud = longitud;
  }

  getLatitud(): number {
    return this.latitud;
  }
  getLongitud(): number {
    return this.longitud;
  }
}
