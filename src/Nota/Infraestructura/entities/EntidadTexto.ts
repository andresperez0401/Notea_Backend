/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, } from 'typeorm';
import EntidadContenido from './EntidadContenido';

@Entity('texto')
export class EntidadTexto {
  @PrimaryColumn()
  id: string;

  @Column()
  texto: string;

  @OneToOne( () => EntidadContenido, (contenido) => contenido.texto, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
  @JoinColumn()
  contenido: EntidadContenido;
}

export default EntidadTexto;
