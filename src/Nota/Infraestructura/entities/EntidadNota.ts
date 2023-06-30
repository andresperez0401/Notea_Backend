/* eslint-disable prettier/prettier */
//model

import { EstadoEnum } from "src/Nota/Dominio/ValueObjectsNota/EstadoEnum";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { EntidadUbicacion } from "./EntidadUbicacion";
import EntidadImagen from "./EntidadImagen";
import { EntidadTarea } from "./EntidadTarea";

@Entity('nota')
export class EntidadNota {

    @PrimaryColumn()
    id: string;

    @Column()
    titulo: string;

    @Column()
    contenido: string;

    @Column({nullable: true})
    fechaCreacion: Date;

    @Column({type:'json', nullable: true})
    ubicacion: EntidadUbicacion

    @Column({type:'enum', enum:EstadoEnum}) //el enumerado se guarda como string
    estado: string;

    @OneToMany(() => EntidadTarea, (tarea) => tarea.nota, {cascade: ['remove', 'insert', 'update'], eager: true, nullable: true})
    tareas: EntidadTarea[];

    @OneToMany(() => EntidadImagen, (imagen) => imagen.nota, {cascade: ['remove', 'insert', 'update'], eager: true, nullable: true})
    imagenes: EntidadImagen[];

    @Column()
    grupo: string
}
