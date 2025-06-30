import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartServiceService } from './cart-service.service';
import { CreateCartDto } from 'lib/dtos/dto-cart-service/create-cart-dto';
import { CreateCartItemDto } from 'lib/dtos/dto-cart-service/create-cart-item-dto';

/**
 * Controller do microserviço de carrinho, expõe endpoints via RabbitMQ.
 */
@Controller()
export class CartServiceController {
  constructor(private readonly cartService: CartServiceService) {}

  /**
   * Cria um novo carrinho para o usuário.
   */
  @MessagePattern({ cmd: 'create-cart' })
  createCart(@Payload() data: CreateCartDto) {
    return this.cartService.createCart(data);
  }

  /**
   * Busca o carrinho de um usuário pelo userId.
   */
  @MessagePattern({ cmd: 'get-cart-by-user' })
  getCartByUser(@Payload() userId: string) {
    return this.cartService.getCartByUser(userId);
  }

  /**
   * Adiciona um item ao carrinho do usuário.
   */
  @MessagePattern({ cmd: 'add-item-to-cart' })
  addItemToCart(@Payload() payload: { userId: string; item: CreateCartItemDto }) {
    return this.cartService.addItemToCart(payload.userId, payload.item);
  }

  /**
   * Remove um item do carrinho do usuário.
   */
  @MessagePattern({ cmd: 'remove-item-from-cart' })
  removeItemFromCart(@Payload() payload: { userId: string; productId: string }) {
    return this.cartService.removeItemFromCart(payload.userId, payload.productId);
  }

  /**
   * Limpa todos os itens do carrinho do usuário.
   */
  @MessagePattern({ cmd: 'clear-cart' })
  clearCart(@Payload() userId: string) {
    return this.cartService.clearCart(userId);
  }
}
