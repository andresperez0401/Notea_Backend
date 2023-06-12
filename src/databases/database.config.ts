import {TypeOrmModuleOptions } from "@nestjs/typeorm";
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'perezdasilva',
    database: 'prueba_dart',
    entities: ['Notea_Backend/src/Usuario/Infraestructura/user.entity.{js,ts}'],
    synchronize: true,
    logging: true,
}

//"postgres", "perezdasilva", "localhost", 5433, "prueba_dart"
// username, password, host, port, database