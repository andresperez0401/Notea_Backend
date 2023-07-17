/* eslint-disable prettier/prettier */
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';
import { EntidadNota } from 'src/Nota/Infraestructura/entities/EntidadNota';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('etiqueta')
export class entidadEtiqueta {
  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'enum', enum: colorEtiqueta })
  color: string;

  @Column()  //Deberia ser ManyToOne
  usuarioId: string;

  @ManyToMany(() => EntidadNota, (nota) => nota.etiquetas, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true,
    eager: false,
  })
  notas: EntidadNota[];
}

