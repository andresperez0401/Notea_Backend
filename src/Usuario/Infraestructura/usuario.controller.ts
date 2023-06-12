import { Body, Controller, Post, Get, Query} from '@nestjs/common';
import { _user } from './user.entity';
import { usuarioService } from './usuariosService';


@Controller('usuarios')
export class usuarioController{

    constructor(private usuariosService: usuarioService){}

    @Get()
   async getUsuarios(): Promise<Iterable<_user>>{
        return this.usuariosService.getAllUsers();
    }
}