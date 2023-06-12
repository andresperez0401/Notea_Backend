import { Module } from '@nestjs/common';

import { DatabaseModule } from './db/db.module';
import { UsuarioModule } from './Usuario/Infraestructura/usuario.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
