import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartDto } from 'lib/dtos/dto-cart-service/create-cart-dto';
import { UpdateCartDto } from 'lib/dtos/dto-cart-service/update-cart-dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll() {
    return this.cartService.findAllCarts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findCart(id);
  }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCart(id);
  }
} 