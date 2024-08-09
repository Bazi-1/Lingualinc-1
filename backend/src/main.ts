import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


/**
 * Main bootstrap function to initialize and start the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  
  await app.listen(3001);
}
bootstrap();
