import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DB_HOST1, DB_NAME1, DB_PASSWORD1, DB_PORT1, DB_USER1 } from 'config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    //Propiedades correspondientes a la conexion con la base de datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST1,
      port: parseInt(DB_PORT1),
      username: DB_USER1,
      password: DB_PASSWORD1,
      database: DB_NAME1,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
