import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Clean Architecture Blog with JWT Auth and CQRS')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👈 /api URL

  await app.listen(3000);
}
bootstrap();
