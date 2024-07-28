import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const apiRestApp = await NestFactory.create(AppModule);
  apiRestApp.useGlobalPipes(new ValidationPipe());
  const rabbitApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: process.env.RABBITMQ_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  rabbitApp.useGlobalPipes(new ValidationPipe());
  await Promise.all([
    apiRestApp.listen(parseInt(process.env.PORT)),
    rabbitApp.listen(),
  ]);
}
bootstrap();
