import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateCartDto } from 'lib/dtos/dto-cart-service/create-cart-dto';
import { UpdateCartDto } from 'lib/dtos/dto-cart-service/update-cart-dto';
import { CreateCartItemDto } from 'lib/dtos/dto-cart-service/create-cart-item-dto';
import { UpdateCartItemDto } from 'lib/dtos/dto-cart-service/update-cart-item-dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

/**
 * Serviço responsável pelas operações de carrinho de compras.
 * Métodos: criar carrinho, adicionar/remover item, listar carrinho, limpar carrinho.
 */
@Injectable()
export class CartServiceService {
  constructor(
    private prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {}

  /**
   * Cria um novo carrinho para o usuário.
   */
  async createCart(data: CreateCartDto) {
    return this.prisma.cart.create({
      data: {
        userId: data.userId,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
  }

  /**
   * Busca o carrinho de um usuário pelo userId.
   */
  async getCartByUser(userId: string) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }

  /**
   * Adiciona um item ao carrinho do usuário. Cria o carrinho se não existir.
   */
  async addItemToCart(userId: string, item: CreateCartItemDto) {
    let cart = await this.prisma.cart.findFirst({ where: { userId }, include: { items: true } });
    if (!cart) {
      cart = await this.createCart({ userId, items: [item] });
      // Notificar item adicionado
      await firstValueFrom(this.notificationClient.emit({ cmd: 'notify-cart-item-added' }, { userId, item }));
      return cart;
    }
    // Se o item já existe, atualiza a quantidade
    const existingItem = cart.items.find(i => i.productId === item.productId);
    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
    // Notificar item adicionado
    await firstValueFrom(this.notificationClient.emit({ cmd: 'notify-cart-item-added' }, { userId, item }));
    return this.getCartByUser(userId);
  }

  /**
   * Remove um item do carrinho do usuário.
   */
  async removeItemFromCart(userId: string, productId: string) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) return null;
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
    // Notificar item removido
    await firstValueFrom(this.notificationClient.emit({ cmd: 'notify-cart-item-removed' }, { userId, productId }));
    return this.getCartByUser(userId);
  }

  /**
   * Limpa todos os itens do carrinho do usuário.
   */
  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) return null;
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return this.getCartByUser(userId);
  }
}
