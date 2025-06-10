import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateProductDto } from 'lib/dtos/dto-product-service/create-product-dto';
import { UpdateProductDto } from 'lib/dtos/dto-product-service/update-product-dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }
  findAllProducts() {
    return this.prisma.product.findMany();
  }

  findProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      }
    })
  }

  createProduct(data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      }
    })
  }


  updateProduct(id: string, data: UpdateProductDto) {
    return this.prisma.product.updateMany({
      where: {
        id: id
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      }
    });
  }


  deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: {
        id: id
      }
    })
  }
}
