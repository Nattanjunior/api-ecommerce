import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateOrderDto } from 'lib/dtos/dto-order-service/create-order-dto';
import { UpdateOrderDto } from 'lib/dtos/dto-order-service/update-order-dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

/**
 * Serviço responsável pelas operações de pedidos.
 * Métodos: criar pedido, listar por usuário, buscar por ID, atualizar status.
 */
@Injectable()
export class OrderServiceService {
  constructor(
    private prisma: PrismaService,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {}

  /**
   * Cria um novo pedido com fluxo flexível: pode vir do carrinho ou direto.
   * Se não vier items, busca do carrinho do usuário.
   * Esvazia o carrinho após criar pedido a partir dele.
   */
  async createOrder(data: CreateOrderDto) {
    let items = data.items;
    // Se não vier items, buscar do carrinho
    if (!items || items.length === 0) {
      const cart = await firstValueFrom(this.cartClient.send({ cmd: 'get-cart-by-user' }, data.userId));
      if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error('Carrinho vazio ou não encontrado');
      }
      items = cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price ?? 0, // Ajuste conforme necessário
      }));
      // Esvaziar carrinho após criar pedido
      await firstValueFrom(this.cartClient.send({ cmd: 'clear-cart' }, data.userId));
    }
    if (!items || items.length === 0) {
      throw new Error('Pedido deve conter ao menos um item');
    }
    const pedido = await this.prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        status: data.status,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
    // Notificar pedido criado e compra finalizada
    await firstValueFrom(this.notificationClient.emit({ cmd: 'notify-order-created' }, pedido));
    await firstValueFrom(this.notificationClient.emit({ cmd: 'notify-purchase-finished' }, pedido));
    return pedido;
  }

  /**
   * Lista todos os pedidos de um usuário.
   */
  async listOrdersByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }

  /**
   * Busca um pedido pelo ID.
   */
  async getOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  /**
   * Atualiza status ou dados do pedido.
   */
  async updateOrder(id: string, data: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        userId: data.userId,
        total: data.total,
        status: data.status,
        // Não atualiza itens por padrão (pode ser expandido se necessário)
      },
      include: { items: true },
    });
  }
}
