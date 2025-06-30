import { NestFactory } from '@nestjs/core';
import { RabbitmqModule } from './rabbitmq.module';

async function bootstrap() {
  const app = await NestFactory.create(RabbitmqModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
