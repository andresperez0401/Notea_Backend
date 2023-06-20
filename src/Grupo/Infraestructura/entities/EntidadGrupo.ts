import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Grupo')
export class EntidadGrupo {
  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  idUsuario: string;
}