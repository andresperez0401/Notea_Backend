import { Body, Controller, Post, Get, Query} from '@nestjs/common';
import { Usuario } from './user.entity';
import { usuarioService } from './usuariosService';


@Controller('usuarios')
export class usuarioController{

    constructor(private usuariosService: usuarioService){}

    @Get('')
    async getUsuarios(): Promise<Iterable<Usuario>>{
        return this.usuariosService.getAllUsers();
    }
}