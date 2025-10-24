import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigModule } from '@nestjs/config';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { CustomValidationPipe } from './app/commons/pipes/validation.pipe';
import { RequestContext } from './app/commons/contexts/request.context';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });

  app.set('trust proxy', 1);

  app.use((req, res, next) => {
    RequestContext.setCurrentRequest(req);
    next();
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new CustomValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: false,
  //     transform: true,
  //   }),
  // );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configSwagger = new DocumentBuilder()
    .setTitle('Learn Nest.JS')
    .setDescription('API Documentation for my backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
