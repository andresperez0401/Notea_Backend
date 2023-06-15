/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { Either } from "src/utils/either";
import { Usuario } from "../Dominio/AgregadoUsuario";
import { RepositorioUsuario } from "../Dominio/RepositorioUsuario";
import { RepositorioUsuarioImp } from "../Infraestructura/repository/RepositorioUsuarioImp";

@Injectable()
export class BuscarUsuariosService implements IAplicationService<null, Iterable<Usuario>>{

    private readonly repositorioUsuario: RepositorioUsuario;

    constructor (
        @Inject(RepositorioUsuarioImp)
        repositorioUsuario: RepositorioUsuario){
        
        this.repositorioUsuario = repositorioUsuario;
    }

    async execute(): Promise<Either<Iterable<Usuario>, Error>> {
        return await this.repositorioUsuario.buscarUsuarios();
    }
}