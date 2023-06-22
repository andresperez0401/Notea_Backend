/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntidadNota } from './EntidadNota';

@Entity('imagen')
export class EntidadImagen {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  nombre: string;

  @Column({
    type: 'bytea',
  })
  buffer: Buffer;

  @ManyToOne( () => EntidadNota, (nota) => nota.imagenes, {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
  nota: EntidadNota;
}

export default EntidadImagen;
