import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'api-gateway',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API E-commerce')
    .setDescription('Documentação da API do e-commerce')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('API Gateway is running on port 3000');
}
bootstrap();
