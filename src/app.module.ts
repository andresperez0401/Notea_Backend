import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { UsuarioModule } from './Usuario/Infraestructura/usuario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotaModule } from './Nota/Infraestructura/nota.module';
import { EtiquetaModule } from './Etiqueta/Infraestructura/etiqueta.module';
import { GrupoModule } from './Grupo/Infraestructura/grupo.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DecoratorModule } from './Decorators/Infraestructura/decorator.module';
import { SuscripcionModule } from './Suscripcion/Infraestructura/suscripcion.module';
@Module({
  imports: [
    DatabaseModule,
    NotaModule,
    UsuarioModule,
    EtiquetaModule,
    GrupoModule,
    CqrsModule,
    DecoratorModule,
    SuscripcionModule,
  ], // Importa tus módulos aquí
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
