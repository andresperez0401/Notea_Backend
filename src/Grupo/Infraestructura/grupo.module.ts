import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadGrupo } from './entities/EntidadGrupo';
import { RepositorioGrupoImp } from './repository/RepositorioGrupoImpl';
import { CrearGrupoService } from '../Aplicacion/crearGrupoService';
import { GrupoController } from './controllers/grupoController';
import { buscarGruposService } from '../Aplicacion/buscarGruposService';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadGrupo])],
  controllers: [GrupoController],
  providers: [
    //RepositorioUsuarioImp,
    CrearGrupoService,
    buscarGruposService,
    {
      provide: 'RepositorioGrupo',
      useClass: RepositorioGrupoImp,
    },
  ],
})
export class GrupoModule {}
