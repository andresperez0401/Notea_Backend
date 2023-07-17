import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: cors.CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));

  await app.listen(port);
}

bootstrap();
