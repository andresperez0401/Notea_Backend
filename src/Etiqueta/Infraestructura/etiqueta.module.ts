import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entidadEtiqueta } from './entities/entidadEtiqueta';
import { EtiquetaController } from './controller/Etiqueta.controller';
import { repositorioEtiquetaImp } from './repository/repositorioEtiquetaImp';
import { crearEtiquetaService } from '../Aplicacion/crearEtiqueta.service';
import { buscarEtiquetasService } from '../Aplicacion/buscarEtiquetas.service';
import { actualizarEtiquetaService } from '../Aplicacion/actualizarEtiqueta.service';
import { actualizarEtiquetaController } from './controller/actualizarEtiquetaController';
import { DecoratorModule } from 'src/Decorators/Infraestructura/decorator.module';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { buscarEtiquetasController } from './controller/buscarEtiquetasController';
import { crearEtiquetaController } from './controller/crearEtiquetaController';

@Module({
  imports: [TypeOrmModule.forFeature([entidadEtiqueta]),
            forwardRef(() => DecoratorModule)],
            
  controllers: [EtiquetaController,
                actualizarEtiquetaController,
                buscarEtiquetasController,
                crearEtiquetaController],
  providers: [
    crearEtiquetaService,
    actualizarEtiquetaService,
    buscarEtiquetasService,
    repositorioEtiquetaImp,
    ILoggerImplementation,
    {

      provide: 'RepositorioEtiqueta',
      useClass: repositorioEtiquetaImp,
    },

  ],
  exports: [crearEtiquetaService,repositorioEtiquetaImp], // Añade esta línea para exportar el servicio
})
export class EtiquetaModule {}


