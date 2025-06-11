import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'lib/dtos/dto-product-service/create-product-dto';
import { UpdateProductDto } from 'lib/dtos/dto-product-service/update-product-dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) {}

  async findAllProducts() {
    return await firstValueFrom(this.productClient.send({ cmd: 'find-all-products' }, {}));
  }

  async findProduct(id: string) {
    return await firstValueFrom(this.productClient.send({ cmd: 'find-product' }, id));
  }

  async createProduct(dto: CreateProductDto) {
    return await firstValueFrom(this.productClient.send({ cmd: 'create-product' }, dto));
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    return await firstValueFrom(this.productClient.send({ cmd: 'update-product' }, { id, data: dto }));
  }

  async deleteProduct(id: string) {
    return await firstValueFrom(this.productClient.send({ cmd: 'delete-product' }, id));
  }
}
