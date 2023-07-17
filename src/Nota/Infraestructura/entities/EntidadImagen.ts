/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import EntidadContenido from './EntidadContenido';


export class EntidadImagen {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  nombre: string;

  @Column({
    type: 'bytea',
  })
  buffer: Buffer;

  // @OneToOne( () => EntidadContenido, (contenido) => contenido.Imagen, {cascade: ["insert", "update"], onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
  // @JoinColumn()
  // contenido: EntidadContenido;
}

export default EntidadImagen;
