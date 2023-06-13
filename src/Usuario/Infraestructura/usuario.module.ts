import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/usuario';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioRepositoryImpl } from './repository/usuarioRepositoryImpl';
import { crearUsuarioService } from '../Aplicacion/crearUsuarioService';
import { getAllUsersService } from '../Aplicacion/getAllUsersService';
import { findByEmailService } from '../Aplicacion/findByEmailService';
import { findByIdService } from '../Aplicacion/findByIdService';
import { eliminarUsuarioService } from '../Aplicacion/eliminarUsuarioService';
import { editarUsuarioService } from '../Aplicacion/editarUsuarioService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsuarioController],
  providers: [
    UsuarioRepositoryImpl,
    crearUsuarioService,
    getAllUsersService,
    findByEmailService,
    findByIdService,
    eliminarUsuarioService,
    editarUsuarioService,
  ],
})
export class UsuarioModule {}
