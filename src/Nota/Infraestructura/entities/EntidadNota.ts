/* eslint-disable prettier/prettier */
//model

import { EstadoEnum } from "src/Nota/Dominio/ValueObjectsNota/EstadoEnum";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { EntidadUbicacion } from "./EntidadUbicacion";
import EntidadContenido from "./EntidadContenido";

@Entity('nota')
export class EntidadNota {

    @PrimaryColumn()
    id: string;

    @Column()
    titulo: string;

    @Column({nullable: true})
    fechaCreacion: Date;

    @Column({type:'json', nullable: true})
    ubicacion: EntidadUbicacion

    @Column({type:'enum', enum:EstadoEnum}) //el enumerado se guarda como string
    estado: string;

    @OneToMany(() => EntidadContenido, (contenido) => contenido.nota, {cascade: ['remove', 'insert', 'update'], eager: true, nullable: true})
    contenidos: EntidadContenido[];

    @Column()
    grupo: string
}
