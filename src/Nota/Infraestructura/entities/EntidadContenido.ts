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

  @OneToOne( () => EntidadTexto, (texto) => texto.contenido, {cascade: true, nullable: true})
  texto: EntidadTexto;

  @OneToMany( () => EntidadTarea, (tarea) => tarea.contenido, {cascade: true, eager: true, nullable: true})
  tareas: EntidadTarea[];

  @OneToOne( () => EntidadImagen, (imagen) => imagen.contenido, {cascade: true, nullable: true, eager: true})
  Imagen: EntidadImagen;

  @ManyToOne( () => EntidadNota, (nota) => nota.contenidos, {cascade: ["insert", "update"], onDelete: 'CASCADE', nullable: true})
  nota: EntidadNota;
}

export default EntidadContenido;
