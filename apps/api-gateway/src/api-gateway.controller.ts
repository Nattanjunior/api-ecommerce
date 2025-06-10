import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateProductDto } from 'lib/dtos/dto-product-service/create-product-dto';
import { UpdateProductDto } from 'lib/dtos/dto-product-service/update-product-dto';

@Controller('products')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  async getAll() {
    return this.apiGatewayService.findAllProducts();
  }

  @Get(':id')
  async getById(id: string) {
    return this.apiGatewayService.findProduct(id);
  }

  @Post('create')
  async createProduct(data: CreateProductDto) {
    return this.apiGatewayService.createProduct(data);
  }

  @Put(':id')
  async updateProduct(id: string, data: UpdateProductDto) {
    return this.apiGatewayService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(id: string) {
    return this.apiGatewayService.deleteProduct(id);
  }
}

