/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import EntidadTarea from './EntidadTarea';
import EntidadImagen from './EntidadImagen';
import EntidadTexto from './EntidadTexto';
import { EntidadNota } from './EntidadNota';

@Entity('Contenido')
export class EntidadContenido {
  @PrimaryColumn()
  id: string;

  // @OneToOne(() => EntidadTexto, (texto) => texto.contenido, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, nullable: true})
  // texto: EntidadTexto;

  // @OneToMany(() => EntidadTarea, (tarea) => tarea.contenido, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, nullable: true})
  // tareas: EntidadTarea[];

  // @OneToOne( () => EntidadImagen, (imagen) => imagen.contenido, {cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, nullable: true})
  // Imagen: EntidadImagen;

  @Column({type: 'json', nullable: true})
  contenido: any;

  @ManyToOne( () => EntidadNota, (nota) => nota.contenidos, {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
  nota: EntidadNota;

  @Column()
  orden : number;
}

export default EntidadContenido;
