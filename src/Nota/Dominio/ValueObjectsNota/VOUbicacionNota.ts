export class VOubicacionNota {
  private latitud: number;
  private longitud: number;

  private constructor(latitud: number, longitud: number) {
    this.latitud = latitud;
    this.longitud = longitud;
  }

  static crearUbicacionNota(
    latitud?: number,
    longitud?: number,
  ): VOubicacionNota {
    return new VOubicacionNota(latitud, longitud);
  }

  getLatitud(): number {
    return this.latitud;
  }
  getLongitud(): number {
    return this.longitud;
  }
}
