import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadGrupo } from './entities/EntidadGrupo';
import { RepositorioGrupoImp } from './repository/RepositorioGrupoImpl';
import { CrearGrupoService } from '../Aplicacion/crearGrupoService';
import { GrupoController } from './controllers/grupoController';
import { buscarGruposService } from '../Aplicacion/buscarGruposService';
import { eliminarGrupoService } from '../Aplicacion/eliminarGrupoService';
import { buscarGruposDeUsuarioService } from '../Aplicacion/buscarGruposDeUsuarioService';
import { EditarGrupoService } from '../Aplicacion/editarGrupoService';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadGrupo])],
  controllers: [GrupoController],
  providers: [
    //RepositorioUsuarioImp,
    CrearGrupoService,
    buscarGruposService,
    eliminarGrupoService,
    buscarGruposDeUsuarioService,
    EditarGrupoService,
    RepositorioGrupoImp,
    {
      provide: 'RepositorioGrupo',
      useClass: RepositorioGrupoImp,
    },
  ],
})
export class GrupoModule {}
