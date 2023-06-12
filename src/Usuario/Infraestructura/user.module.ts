import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/databases/database.config';
import { usuarioController } from './usuario.controller';
import { usuarioService } from './usuariosService';
import { _user } from './user.entity';
import { type } from 'os';

@Module({
  imports: [
    TypeOrmModule.forFeature([_user]),
    TypeOrmModule.forRoot(typeOrmConfig),

  ],
  controllers: [usuarioController],
  providers: [usuarioService],
})
export class userModule {}