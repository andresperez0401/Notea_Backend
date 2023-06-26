/* eslint-disable prettier/prettier */
//model

import { EstadoEnum } from "src/Nota/Dominio/ValueObjectsNota/EstadoEnum";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { EntidadUbicacion } from "./EntidadUbicacion";
import EntidadImagen from "./EntidadImagen";

@Entity('nota')
export class EntidadNota {

    @PrimaryColumn()
    id: string;

    @Column()
    titulo: string;

    @Column()
    contenido: string;

    @Column()
    fechaCreacion: Date;

    @Column({type:'json', nullable: true})
    ubicacion: EntidadUbicacion

    @Column({type:'enum', enum:EstadoEnum}) //el enumerado se guarda como string
    estado: string;

    @OneToMany(() => EntidadImagen, (imagen) => imagen.nota, {cascade: ['remove'], eager: true, nullable: true})
    imagenes: EntidadImagen[];

    @Column()
    grupo: string
}
