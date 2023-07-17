import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { TipoSuscripcionEnum } from "src/Suscripcion/Dominio/tipoSuscripcionEnum";

@Entity('suscripcion')
export class EntidadSuscripcion {

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    fechaInicio: Date;

    @Column({nullable: true})
    fechaFin: Date;

    @Column({type:'enum', enum:TipoSuscripcionEnum}) //el enumerado se guarda como string
    tipo: string;

    @Column({nullable: false})
    idUsuario: string;
}
