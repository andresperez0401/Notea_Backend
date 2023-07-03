import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntidadNota } from './EntidadNota';

@Entity('tarea')
export class EntidadTarea {
  @PrimaryColumn()
  id: string;

  @Column()
  titulo: string;

  @Column()
  check: boolean;

  @ManyToOne(() => EntidadNota, (nota) => nota.tareas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  nota: EntidadNota;
}

export default EntidadTarea;
