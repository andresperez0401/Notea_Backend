import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadGrupo } from './entities/EntidadGrupo';
import { RepositorioGrupoImp } from './repository/RepositorioGrupoImpl';
import { CrearGrupoService } from '../Aplicacion/crearGrupoService';
import { grupoController } from './controllers/grupoController';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadGrupo])],
  controllers: [grupoController],
  providers: [
    //RepositorioUsuarioImp,
    CrearGrupoService,
    {
      provide: 'RepositorioGrupo',
      useClass: RepositorioGrupoImp,
    },
  ],
})
export class GrupoModule {}
