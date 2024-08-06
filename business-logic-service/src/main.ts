import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  // Swagger Configurations
  const config = new DocumentBuilder()
    .setTitle('Advanced Microservices Concepts')
    .setDescription(
      'This is a test application built by dewMyth for practicing several concepts that are used in microservices. Such as background job handling with bull queues',
    )
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
