import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entidadEtiqueta } from './entities/entidadEtiqueta';
import { EtiquetaController } from './controller/Etiqueta.controller';
import { repositorioEtiquetaImp } from './repository/repositorioEtiquetaImp';
import { crearEtiquetaService } from '../Aplicacion/crearEtiqueta.service';
import { buscarEtiquetasService } from '../Aplicacion/buscarEtiquetas.service';
import { actualizarEtiquetaService } from '../Aplicacion/actualizarEtiqueta.service';

@Module({
  imports: [TypeOrmModule.forFeature([entidadEtiqueta])],
  controllers: [EtiquetaController],
  providers: [
    crearEtiquetaService,
    actualizarEtiquetaService,
    buscarEtiquetasService,
    repositorioEtiquetaImp,
    {

      provide: 'RepositorioEtiqueta',
      useClass: repositorioEtiquetaImp,
    },

  ],
  exports: [crearEtiquetaService,repositorioEtiquetaImp], // Añade esta línea para exportar el servicio
})
export class EtiquetaModule {}


