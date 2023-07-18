/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/Decorators/Aplicacion/LoggerService';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { EntidadSuscripcion } from './entities/entidadSuscripcion';
import { EntidadUsuario } from 'src/Usuario/Infraestructura/entities/EntidadUsuario';
import { DecoratorModule } from 'src/Decorators/Infraestructura/decorator.module';
import { RepositorioSuscripcionImp } from './RepositorioSuscripcionImpl';
import { crearSucripcionController } from './Controllers/crearSucripcionController';
import { CrearSuscripcionService } from '../Aplicacion/crearSuscripcionService';
import { cambiarSucripcionController } from './Controllers/cambiarTipoSuscripcionController';
import { cambiarTipoSuscripcionService } from '../Aplicacion/cambiarTipoSuscripcionService';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadSuscripcion,EntidadUsuario]),forwardRef(() => DecoratorModule)],
  controllers: [crearSucripcionController,cambiarSucripcionController],
  providers: [ // Aqui se agregan los servicios
    CrearSuscripcionService,
    cambiarTipoSuscripcionService,
    RepositorioSuscripcionImp,
    ILoggerImplementation,
    LoggerService,
    
  ],
  exports: [CrearSuscripcionService, RepositorioSuscripcionImp], 

})
export class SuscripcionModule {}