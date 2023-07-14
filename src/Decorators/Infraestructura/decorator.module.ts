import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../Aplicacion/LoggerService';
import { ILoggerImplementation } from './ILoggerImplementation';
import { GrupoModule } from 'src/Grupo/Infraestructura/grupo.module';
import { UsuarioModule } from 'src/Usuario/Infraestructura/usuario.module';

@Module({
  imports: [forwardRef(() =>GrupoModule),forwardRef(() =>UsuarioModule) ],
//  controllers: [],
  providers: [
    //RepositorioUsuarioImp,
    LoggerService,
    ILoggerImplementation,
  ],
})
export class DecoratorModule {}
