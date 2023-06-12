import { Column } from 'typeorm';

export class EntidadUbicacion {
  @Column()
  latitud: number;

  @Column()
  longitud: number;
}
