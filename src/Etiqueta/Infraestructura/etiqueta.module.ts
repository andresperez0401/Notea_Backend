import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entidadEtiqueta } from './entities/entidadEtiqueta';
import { EtiquetaController } from './controller/Etiqueta.controller';
import { repositorioEtiquetaImp } from './repository/repositorioEtiquetaImp';
import { crearEtiquetaService } from '../Aplicacion/crearEtiqueta.service';
//import { modificarEtiquetaService } from '../Aplicacion/modificarEtiqueta.service';
import { buscarEtiquetasService } from '../Aplicacion/buscarEtiquetas.service';

@Module({
  imports: [TypeOrmModule.forFeature([entidadEtiqueta])],
  controllers: [EtiquetaController],
  providers: [
    //repositorioEtiquetaImp,
    crearEtiquetaService,
    //modificarEtiquetaService,
    buscarEtiquetasService,
    {
      // Aqui se agregan los repositorios, se debe especificar la clase que implementa la interfaz
      provide: 'RepositorioEtiqueta',
      useClass: repositorioEtiquetaImp,
    },
  ],
})
export class EtiquetaModule {}
