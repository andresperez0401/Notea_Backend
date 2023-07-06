import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../Aplicacion/LoggerService';
import { ILoggerImplementation } from './ILoggerImplementation';
import { GrupoModule } from 'src/Grupo/Infraestructura/grupo.module';

@Module({
  imports: [forwardRef(() =>GrupoModule)],
//  controllers: [],
  providers: [
    //RepositorioUsuarioImp,
    LoggerService,
    ILoggerImplementation,
  ],
})
export class DecoratorModule {}
