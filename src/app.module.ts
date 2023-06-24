import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { UsuarioModule } from './Usuario/Infraestructura/usuario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotaModule } from './Nota/Infraestructura/nota.module';

import { EtiquetaModule } from './Etiqueta/Infraestructura/etiqueta.module';

@Module({
  imports: [DatabaseModule, NotaModule, UsuarioModule,EtiquetaModule], //aca debemos importar todos los modulos que vayamos creando
import { GrupoModule } from './Grupo/Infraestructura/grupo.module';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [
    DatabaseModule,
    NotaModule,
    UsuarioModule,
    EtiquetaModule,
    GrupoModule,
    CqrsModule,
  ], // Importa tus módulos aquí
  controllers: [AppController],
  providers: [AppService],

export class AppModule {}
