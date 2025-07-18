import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductServiceModule } from './product-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'product-queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Product Service is listening to RabbitMQ');
}
bootstrap();
