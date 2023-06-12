import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class _user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  dateofbirth: Date;
}