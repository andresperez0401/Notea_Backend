import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Usuario')
export class EntidadUsuario {
  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  clave: string;

  @Column()
  suscripcion: boolean;
}

// @CreateDateColumn({
//   type: 'timestamptz',
//   default: () => 'CURRENT_TIMESTAMP',
// })
// createAt: Date;

// @UpdateDateColumn({
//   type: 'timestamptz',
//   default: () => 'CURRENT_TIMESTAMP',
// })
// updateAt: Date;
