import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductService } from './product-service.service';
import { PrismaModule } from 'apps/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductServiceController],
  providers: [ProductService],
})
export class ProductServiceModule {}
