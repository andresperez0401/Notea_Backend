import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/databases/database.config';
import { usuarioController } from './usuario.controller';
import { usuarioService } from './usuariosService';
import { Usuario } from './user.entity';
import { type } from 'os';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forRoot(typeOrmConfig),

  ],
  controllers: [usuarioController],
  providers: [usuarioService],
})
export class userModule {}