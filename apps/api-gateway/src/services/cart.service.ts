import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCartDto } from 'lib/dtos/dto-cart-service/create-cart-dto';
import { UpdateCartDto } from 'lib/dtos/dto-cart-service/update-cart-dto';
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

  async createCart(data: CreateCartDto) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'create-cart' }, data));
  }

  async updateCart(id: string, data: UpdateCartDto) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'update-cart' }, { id, data }));
  }

  async deleteCart(id: string) {
    return await firstValueFrom(this.cartClient.send({ cmd: 'delete-cart' }, id));
  }
} 