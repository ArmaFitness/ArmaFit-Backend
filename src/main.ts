import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // removes extra fields
    forbidNonWhitelisted: true, // throws if unknown fields are sent
    transform: true, // ensures dto is properly typed
  }));
  
  const config = new DocumentBuilder()
    .setTitle('Workout API')
    .setDescription('API documentation for coach & athlete platform')
    .setVersion('1.0')
    .addBearerAuth() // JWT support
    .build();
    
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3333);
}
bootstrap();
