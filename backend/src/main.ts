import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS para desarrollo
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  app.setGlobalPrefix('api/v1');
  
  await app.listen(4000);
  console.log(`🚀 Backend running on http://localhost:4000/api/v1`);
}
bootstrap();
