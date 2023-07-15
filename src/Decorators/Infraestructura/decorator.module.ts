import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../Aplicacion/LoggerService';
import { ILoggerImplementation } from './ILoggerImplementation';
import { GrupoModule } from 'src/Grupo/Infraestructura/grupo.module';
import { UsuarioModule } from 'src/Usuario/Infraestructura/usuario.module';
import { EtiquetaModule } from 'src/Etiqueta/Infraestructura/etiqueta.module';

@Module({
  imports: [forwardRef(() =>GrupoModule),
            forwardRef(() =>UsuarioModule),
            forwardRef(() => EtiquetaModule)],
//  controllers: [],
  providers: [
    //RepositorioUsuarioImp,
    LoggerService,
    ILoggerImplementation,
  ],
})
export class DecoratorModule {}
