import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateOrderDto } from 'lib/dtos/dto-order-service/create-order-dto';
import { UpdateOrderDto } from 'lib/dtos/dto-order-service/update-order-dto';

/**
 * Serviço responsável pelas operações de pedidos.
 * Métodos: criar pedido, listar por usuário, buscar por ID, atualizar status.
 */
@Injectable()
export class OrderServiceService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo pedido com itens.
   */
  async createOrder(data: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        status: data.status,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
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
