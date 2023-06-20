import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('etiqueta')
export class entidadEtiqueta {
  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'enum', enum: colorEtiqueta })
  color: string;
}
