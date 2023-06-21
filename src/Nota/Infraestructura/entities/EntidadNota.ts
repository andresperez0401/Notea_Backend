/* eslint-disable prettier/prettier */
//model

import { EstadoEnum } from "src/Nota/Dominio/ValueObjectsNota/EstadoEnum";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { EntidadUbicacion } from "./EntidadUbicacion";

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

    @Column(() => EntidadUbicacion)
    ubicacion: EntidadUbicacion

    @Column({type:'enum', enum:EstadoEnum}) //el enumerado se guarda como string
    estado: string;

    @Column()
    grupo: string
}
