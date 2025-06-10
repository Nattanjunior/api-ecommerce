import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateProductDto } from 'lib/dtos/dto-product-service/create-product-dto';
import { UpdateProductDto } from 'lib/dtos/dto-product-service/update-product-dto';

@Controller()
export class ProductServiceController {
  constructor(private readonly ProductService: ProductService) { }

  @MessagePattern({ cmd: 'find-all-products' })
  findAllProducts() {
    return this.ProductService.findAllProducts();
  } 

  @MessagePattern({ cmd: 'find-product' })
  findProduct(@Payload() id: string) {
    return this.ProductService.findProduct(id);
  }

  @MessagePattern({ cmd: 'create-product' })
  createProduct(@Payload() data: CreateProductDto) {
    return this.ProductService.createProduct(data);
  }

  @MessagePattern({ cmd: 'update-product' })
  updateProduct(@Payload() payload: { id: string; data: UpdateProductDto }) {
    return this.ProductService.updateProduct(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete-product' })
  deletteProduct(@Payload() id: string) {
    return this.ProductService.deleteProduct(id);
  }
}
