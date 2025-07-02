import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './shared/guards/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add this in your `main.ts` before app.listen()


  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Clean Architecture Blog with JWT Auth and CQRS')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  

app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  await app.listen(3000);

}
bootstrap();
