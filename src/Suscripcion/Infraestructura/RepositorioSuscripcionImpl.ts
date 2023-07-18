import { Either } from "src/Utils/Either";
import { Optional } from "src/Utils/Opcional";
import { Suscripcion } from "../Dominio/AgregadoSuscripcion";
import { EntidadSuscripcion } from "./entities/entidadSuscripcion";
import { EntidadUsuario } from "src/Usuario/Infraestructura/entities/EntidadUsuario";
import { RepositorioSuscripcion } from "../Dominio/repositorioSuscripcion";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TipoSuscripcionEnum } from "../Dominio/tipoSuscripcionEnum";
import { type } from "os";
import { cambiarTipoSuscripcionDto } from "../Aplicacion/dto/CambiarTipoSuscripcionDto";



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

        const response: EntidadSuscripcion = await this.repositorio.findOne({
            where: { idUsuario: suscripcion.getIdUsuario() },
        });

        if (resp){
            if(!response){
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
                return Either.makeRight<Suscripcion,Error>(new Error("El usuario ya tiene una suscripcion"));
            }
        }
        else{
            return Either.makeRight<Suscripcion,Error>(new Error("El usuario no existe"));
        }
    }

    async cambiarTipoSuscripcion(info: cambiarTipoSuscripcionDto): Promise<Either<string, Error>> {
        
        const response: EntidadSuscripcion = await this.repositorio.findOne({
            where: { idUsuario: info.idUsuario },
        });

        if(response){
            const susc: EntidadSuscripcion = new EntidadSuscripcion();
            const opFechaFin = new Optional<Date>(info.fechaFin);
            susc.fechaInicio = new Date();
            
            if(info.tipo == "PREMIUM"){
                susc.tipo = TipoSuscripcionEnum.PREMIUM;
            }
            else{
                susc.tipo = TipoSuscripcionEnum.FREE;
            }

            if(opFechaFin.hasvalue()){
                susc.fechaFin = opFechaFin.getValue();
            }

            await this.repositorio.merge(response, susc);
            const resultado = await this.repositorio.save(response);

            if(resultado){
                return Either.makeLeft<string,Error>("Se actualizo la suscripcion");
            }
            else{
                return Either.makeRight<string,Error>(new Error("No se actualizo la suscripcion"));
            }
            
        }
        else{
            return Either.makeRight<string,Error>(new Error("No se consiguio el usuario"));
        }
    }
        
    

    updateSuscripcion(Suscripcion: Suscripcion): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    buscarSuscripciones(): Promise<Either<Iterable<Suscripcion>, Error>> {
        throw new Error("Method not implemented.");
    }
    eliminarSuscripcion(id: string): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    
    async buscarSuscripcionUsuario(idUsuario: string): Promise<Either<Suscripcion, Error>> {
        const respuesta: EntidadSuscripcion = await this.repositorio.findOne({
            where: { idUsuario: idUsuario },
          });

          
      
        
          if (respuesta) {
                console.log("hola");
            let type: TipoSuscripcionEnum;
            if(respuesta.tipo == "FREE"){
                 type =  TipoSuscripcionEnum.FREE;
            }
            else{
                type = TipoSuscripcionEnum.PREMIUM;
            }

            const suscripcion: Suscripcion = 
            Suscripcion.crearSuscripcion(
                respuesta.fechaInicio,
                type,
                respuesta.idUsuario,
                new Optional<Date>(respuesta.fechaFin),
                respuesta.id,
            )


            return Either.makeLeft<Suscripcion, Error>(suscripcion);
          } else {
            return Either.makeRight<Suscripcion, Error>(
              new Error(`Error al buscar la suscripcion del usuario ${idUsuario}`),
            );
          };
    }
}