import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity('Usuario')
export class Usuario {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

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
