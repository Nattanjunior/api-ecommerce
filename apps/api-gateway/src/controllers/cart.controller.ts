import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartDto } from 'lib/dtos/dto-cart-service/create-cart-dto';
import { CreateCartItemDto } from 'lib/dtos/dto-cart-service/create-cart-item-dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Carrinho')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Buscar carrinho do usuário' })
  @ApiParam({ name: 'userId', required: true })
  @Get(':userId')
  getCartByUser(@Param('userId') userId: string) {
    return this.cartService.getCartByUser(userId);
  }

  @ApiOperation({ summary: 'Criar carrinho para usuário' })
  @ApiBody({ type: CreateCartDto })
  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiParam({ name: 'userId', required: true })
  @ApiBody({ type: CreateCartItemDto })
  @Post(':userId/item')
  addItemToCart(@Param('userId') userId: string, @Body() item: CreateCartItemDto) {
    return this.cartService.addItemToCart(userId, item);
  }

  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiParam({ name: 'userId', required: true })
  @ApiParam({ name: 'productId', required: true })
  @Delete(':userId/item/:productId')
  removeItemFromCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItemFromCart(userId, productId);
  }

  @ApiOperation({ summary: 'Limpar carrinho do usuário' })
  @ApiParam({ name: 'userId', required: true })
  @Delete(':userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
} 