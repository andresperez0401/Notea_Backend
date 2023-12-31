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
import { buscarSuscripcionDeUsuarioService } from '../Aplicacion/buscarPorIdUsuarioSevice';
import { buscarSucripcionDeUsuarioController } from './Controllers/buscarSuscripcionPorUsuarioController';
import { buscarSuscripcionDeUsuarioStringService } from '../Aplicacion/buscarPorIdString';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadSuscripcion,EntidadUsuario]),forwardRef(() => DecoratorModule)],
  controllers: [crearSucripcionController,cambiarSucripcionController, buscarSucripcionDeUsuarioController],
  providers: [ // Aqui se agregan los servicios
    CrearSuscripcionService,
    cambiarTipoSuscripcionService,
    buscarSuscripcionDeUsuarioService,
    buscarSuscripcionDeUsuarioStringService,
    RepositorioSuscripcionImp,
    ILoggerImplementation,
    LoggerService,
    
  ],
  exports: [CrearSuscripcionService, RepositorioSuscripcionImp], 

})
export class SuscripcionModule {}