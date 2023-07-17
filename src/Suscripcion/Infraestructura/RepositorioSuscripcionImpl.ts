import { Either } from "src/Utils/Either";
import { Optional } from "src/Utils/Opcional";
import { Suscripcion } from "../Dominio/AgregadoSuscripcion";
import { EntidadSuscripcion } from "./entities/entidadSuscripcion";
import { EntidadUsuario } from "src/Usuario/Infraestructura/entities/EntidadUsuario";
import { RepositorioSuscripcion } from "../Dominio/repositorioSuscripcion";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TipoSuscripcionEnum } from "../Dominio/tipoSuscripcionEnum";



export class RepositorioSuscripcionImp implements RepositorioSuscripcion{
    
    constructor(
        @InjectRepository(EntidadSuscripcion)
        private readonly repositorio: Repository<EntidadSuscripcion>,
        
        @InjectRepository(EntidadUsuario)
        private readonly repoUsuario: Repository<EntidadUsuario>,
   ){}
    
    async crearSuscripcion(suscripcion: Suscripcion): Promise<Either<Suscripcion, Error>> {     
        const resp: EntidadUsuario = await this.repoUsuario.findOne({
            where: { id: suscripcion.getIdUsuario() },
        });

        if (resp){
            const suscripcionEntidad = new EntidadSuscripcion();
            suscripcionEntidad.id = suscripcion.getId();
            suscripcionEntidad.idUsuario = suscripcion.getIdUsuario();
            suscripcionEntidad.tipo = TipoSuscripcionEnum.FREE;
            suscripcionEntidad.fechaInicio = suscripcion.getFechaInicio();
            
            const opFechaFin = suscripcion.getFechaFin();
            if(opFechaFin.hasvalue()){
                suscripcionEntidad.fechaFin = suscripcion.getFechaFin().getValue();
            }   
            const respuesta = await this.repositorio.save(suscripcionEntidad);

            if(respuesta){
                return Either.makeLeft<Suscripcion,Error>(suscripcion);
            }
            else{
                return Either.makeRight<Suscripcion,Error>(new Error("Error al crear la suscripcion"));
            }
        }
        else{
            return Either.makeRight<Suscripcion,Error>(new Error("El usuario no existe"));
        }
    }


    updateSuscripcion(Suscripcion: Suscripcion): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    cambiarEstadoSuscripcion(id: string, estado: string): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    buscarSuscripciones(): Promise<Either<Iterable<Suscripcion>, Error>> {
        throw new Error("Method not implemented.");
    }
    eliminarSuscripcion(id: string): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    buscarSuscripcionUsuario(idUsuario: string): Promise<Either<Suscripcion, Error>> {
        throw new Error("Method not implemented.");
    }


}