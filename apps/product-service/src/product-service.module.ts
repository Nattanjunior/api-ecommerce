import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductService } from './product-service.service';

@Module({
  imports: [],
  controllers: [ProductServiceController],
  providers: [ProductService],
})
export class ProductServiceModule {}
