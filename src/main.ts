import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SavageSport API')
    .setDescription('The SavageSport API')
    .setContact('Engineering Team', '', 'engineering@savagesport.app')
    .setTermsOfService('https://savagesport.app/terms')
    .setVersion('1.0.0')
    .addServer('https://api.savagesport.app/')
    .addTag('Games')
    .addTag('GameEvents')
    .addTag('Leagues')
    .addTag('RuleSets')
    .addTag('Players')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser());
  app.use(compression());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new FirebaseAuthGuard(reflector));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const port = process.env.PORT || 3000;
  logger.log(
    `Application is running on : ${process.env.NODE_ENV || 'development'}`,
  );
  logger.log(`Server is listening on port ${port}`);
  await app.listen(3050);
}
bootstrap();
