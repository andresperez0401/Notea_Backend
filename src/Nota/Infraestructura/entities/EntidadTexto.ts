/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, } from 'typeorm';
import EntidadContenido from './EntidadContenido';

@Entity('texto')
export class EntidadTexto {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  texto: string;

  // @OneToOne( () => EntidadContenido, (contenido) => contenido.texto, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
  // @JoinColumn()
  // contenido: EntidadContenido;
}

export default EntidadTexto;
