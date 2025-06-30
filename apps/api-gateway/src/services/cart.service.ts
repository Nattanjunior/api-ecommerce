import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCartDto } from 'lib/dtos/dto-cart-service/create-cart-dto';
import { UpdateCartDto } from 'lib/dtos/dto-cart-service/update-cart-dto';
import { CreateCartItemDto } from 'lib/dtos/dto-cart-service/create-cart-item-dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private readonly cartClient: ClientProxy) {}

  async findAllCarts() {
    return await firstValueFrom(this.cartClient.send({ cmd: 'find-all-carts' }, {}));
  }

  async findCart(id: string) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'find-cart' }, id));
  }

  async getCartByUser(userId: string) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'get-cart-by-user' }, userId));
  }

  async createCart(data: CreateCartDto) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'create-cart' }, data));
  }

  async updateCart(id: string, data: UpdateCartDto) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'update-cart' }, { id, data }));
  }

  async deleteCart(id: string) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'delete-cart' }, id));
  }

  async addItemToCart(userId: string, item: CreateCartItemDto) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'add-item-to-cart' }, { userId, item }));
  }

  async removeItemFromCart(userId: string, productId: string) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'remove-item-from-cart' }, { userId, productId }));
  }

  async clearCart(userId: string) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'clear-cart' }, userId));
  }
} 