import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v2');
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`🚀 Microservice 2 (CMS & Page Builder) est actif sur http://localhost:${port}/api/v2`);
}
bootstrap();
