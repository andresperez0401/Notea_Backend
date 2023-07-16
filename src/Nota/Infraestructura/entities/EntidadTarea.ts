// eslint-disable-next-line prettier/prettier
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import EntidadContenido from './EntidadContenido';

export class EntidadTarea {
  @PrimaryColumn()
  id: string;

  @Column()
  titulo: string;

  @Column()
  check: boolean;

  // @ManyToOne(() => EntidadContenido, (contenido) => contenido.tareas, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   nullable: true,
  // })
  // contenido: EntidadContenido;
}

export default EntidadTarea;
