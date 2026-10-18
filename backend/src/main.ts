import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  // Security: Restrict CORS origins in production
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else if (process.env.NODE_ENV === 'production') {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      } else {
        callback(null, true); // Permissive only in development
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Robust data validation & sanitization
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false,
  }));

  // Production Error Handling Filter (Masks stack traces and secret internal messages)
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`[Sufi Garden Backend API] Running on: http://localhost:${port}/api`);
}
bootstrap();
