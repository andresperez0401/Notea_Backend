/* eslint-disable prettier/prettier */
import { EntidadNota } from 'src/Nota/Infraestructura/entities/EntidadNota';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Grupo')
export class EntidadGrupo {
  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  idUsuario: string;

  // @OneToMany(() => EntidadNota, (nota) => nota.grupo, {
  //   cascade: true,
  //   onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, nullable: true
  // })
  // notas: EntidadNota[];
}
