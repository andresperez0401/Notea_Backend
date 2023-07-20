import { actualizarEtiquetaDto } from "src/Etiqueta/Aplicacion/dto/actualizarEtiqueta.dto";
import { Etiqueta } from "src/Etiqueta/Dominio/AgregadoEtiqueta";
import { RepositorioEtiqueta } from "src/Etiqueta/Dominio/RepositorioEtiqueta";
import { cambiarTipoSuscripcionDto } from "src/Suscripcion/Aplicacion/dto/CambiarTipoSuscripcionDto";
import { Suscripcion } from "src/Suscripcion/Dominio/AgregadoSuscripcion";
import { RepositorioSuscripcion } from "src/Suscripcion/Dominio/repositorioSuscripcion";
import { Usuario } from "src/Usuario/Dominio/AgregadoUsuario";
import { RepositorioUsuario } from "src/Usuario/Dominio/RepositorioUsuario";
import { Either } from "src/Utils/Either";

export class MockRepositorioUsuario  implements RepositorioSuscripcion{
    crearSuscripcion(suscripcion: Suscripcion): Promise<Either<Suscripcion, Error>> {
        throw new Error("Method not implemented.");
    }
    updateSuscripcion(suscripcion: Suscripcion): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    
    
    //--------------------------------------------------------//
    async cambiarTipoSuscripcion(info: cambiarTipoSuscripcionDto): Promise<Either<string, Error>> {
        const user = Usuario.crearUsuario(
            "Carlos", 
            'Alonzo', 
            'Calonzo@gmail.com', 
            '1234', 
            false);        
        
        if((info.tipo == "PREMIUM" && info.fechaFin == null) && !user.isSuscribed()){
            return Either.makeLeft('Usuario ahora es premium');
        }else if (((info.tipo =="FREE") || info.fechaFin != null) || user.isSuscribed) {
            return Either.makeRight(new Error('Suscripcion no aprobada'));
        }
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
    buscarSuscripcionStringUsuario(idUsuario: string): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    

}
