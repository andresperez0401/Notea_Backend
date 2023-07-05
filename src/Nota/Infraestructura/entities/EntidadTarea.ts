import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import EntidadContenido from './EntidadContenido';

@Entity('tarea')
export class EntidadTarea {
  @PrimaryColumn()
  id: string;

  @Column()
  titulo: string;

  @Column()
  check: boolean;

  @ManyToOne(() => EntidadContenido, (contenido) => contenido.tareas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  contenido: EntidadContenido;
}

export default EntidadTarea;
