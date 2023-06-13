/*import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { Either } from "../utils/either";
import { CreateUsuarioDto } from "../Infraestructura/dto/usuario.dto";
import { Usuario } from "../Dominio/Usuario";
import { UsuarioRepository } from "../Dominio/usuario.repository";
import { nombreUsuario } from "../Dominio/value_objects/nombreUsuario";
import { apellidoUsuario } from "../Dominio/value_objects/apellidoUsuario";
import { emailUsuario } from "../Dominio/value_objects/emailUsuario";
import { claveUsuario } from "../Dominio/value_objects/claveUsuario";
import { UsuarioRepositoryImpl } from "../Infraestructura/repository/usuarioRepositoryImpl";

@Injectable()
export class getAllUsersService implements IAplicationService<Usuario, Error>{

    private readonly repositorioUsuario: UsuarioRepository;

    constructor (
        @Inject(UsuarioRepositoryImpl)
        repositorioUsuario: UsuarioRepository){
        
        this.repositorioUsuario = repositorioUsuario;
    }

    async execute(s: Usuario): Promise<Either<Usuario, Error>> {
        
        
        return await this.repositorioUsuario.crearUsuario(newUser);
    }
}*/