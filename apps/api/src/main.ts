import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  // TODO: habilitar CORS com o domínio do frontend (Vercel)
  // app.enableCors({ origin: process.env.FRONTEND_URL });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}

bootstrap();
