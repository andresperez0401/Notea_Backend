import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/usuario';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioRepositoryImpl } from './repository/usuarioRepositoryImpl';
import { crearUsuarioService } from '../Aplicacion/crearUsuarioService';
import { getAllUsersService } from '../Aplicacion/getAllUsersService';
import { findByEmailService } from '../Aplicacion/findByEmailService';
import { findByIdService } from '../Aplicacion/findByIdService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsuarioController],
  providers: [
    UsuarioRepositoryImpl,
    crearUsuarioService,
    getAllUsersService,
    findByEmailService,
    findByIdService,
  ],
})
export class UsuarioModule {}
