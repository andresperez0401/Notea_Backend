import { Optional } from 'src/Utils/Opcional';

export class VOubicacionNota {
  private latitud: number;
  private longitud: number;

  private constructor(latitud: number, longitud: number) {
    this.latitud = latitud;
    this.longitud = longitud;
  }

  static crearUbicacionNota(
    latitud: Optional<number>,
    longitud: Optional<number>,
  ): Optional<VOubicacionNota> {
    if (latitud.hasvalue() && longitud.hasvalue()) {
      return new Optional<VOubicacionNota>(
        new VOubicacionNota(latitud.getValue(), longitud.getValue()),
      );
    } else {
      return new Optional<VOubicacionNota>();
    }
  }

  getLatitud(): number {
    return this.latitud;
  }
  getLongitud(): number {
    return this.longitud;
  }
}
