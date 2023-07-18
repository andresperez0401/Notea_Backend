/* eslint-disable prettier/prettier */
//model

import { EstadoEnum } from "src/Nota/Dominio/ValueObjectsNota/EstadoEnum";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { EntidadUbicacion } from "./EntidadUbicacion";
import EntidadContenido from "./EntidadContenido";
import { entidadEtiqueta } from "src/Etiqueta/Infraestructura/entities/entidadEtiqueta";

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

    @OneToMany(() => EntidadContenido, (contenido) => contenido.nota, { cascade: true, 
        onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, nullable: true})
    contenidos: EntidadContenido[];

    @Column()
    grupo: string

    // @ManyToOne(() => EntidadGrupo, (grupo) => grupo.notas,
    //     {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false})
    // grupo: EntidadGrupo;


    @ManyToMany(() => entidadEtiqueta, (etiqueta) => etiqueta.notas, { cascade: true,
        onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true, eager: true})
    @JoinTable()
    etiquetas: entidadEtiqueta[];
}
