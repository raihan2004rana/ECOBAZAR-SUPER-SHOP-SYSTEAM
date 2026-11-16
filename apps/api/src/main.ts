import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('ECOBAZAR-Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Global prefix: /api/v1
  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('ECOBAZAR Retail Operating System API')
    .setDescription('Central NestJS REST API documentation for the ECOBAZAR multi-branch supermarket platform.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  logger.log(`🚀 ECOBAZAR API server running on http://localhost:${port}/${apiPrefix}`);
  logger.log(`📖 Swagger API documentation available at http://localhost:${port}/${apiPrefix}/docs`);
}

bootstrap();
