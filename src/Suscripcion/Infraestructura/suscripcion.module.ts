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

@Module({
  imports: [TypeOrmModule.forFeature([EntidadSuscripcion,EntidadUsuario]),forwardRef(() => DecoratorModule)],
  controllers: [crearSucripcionController],
  providers: [ // Aqui se agregan los servicios
    CrearSuscripcionService,
    RepositorioSuscripcionImp,
    ILoggerImplementation,
    LoggerService,
    
  ],
  exports: [], 

})
export class SuscripcionModule {}