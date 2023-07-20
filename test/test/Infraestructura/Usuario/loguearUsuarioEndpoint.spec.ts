import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { IsObject } from 'class-validator';
import { objectMotherUsuario } from 'test/test/ObjectMotherTest/Usuario/ObjectMotherLoguearUsuario';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';
import { UsuarioModule } from 'src/Usuario/Infraestructura/usuario.module';
import e from 'express';

describe('Loguear Usuario desde el endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    let moduleRef = await Test.createTestingModule({
      imports: [AppModule, UsuarioModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('test_create_group_with_valid_user_id', async () => {
    //Arrange
    const datos = objectMotherUsuario.UsuarioDatosValidos();

    //Act
    const respuesta = (
      await request(app.getHttpServer()).post('/usuario/login').send(datos)
    ).statusCode;

    //Assert
    expect(respuesta).toBe(200);
  });

  it('test_create_group_with_valid_user_id', async () => {
    //Arrange
    const datos = objectMotherUsuario.UsuarioDatosInvalidos();

    //Act
    const respuesta = (
      await request(app.getHttpServer()).post('/usuario/login').send(datos)
    ).statusCode;
    console.log(respuesta);

    //Assert
    expect(respuesta).toBe(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
