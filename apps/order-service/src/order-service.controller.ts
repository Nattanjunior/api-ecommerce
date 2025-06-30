import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderServiceService } from './order-service.service';
import { CreateOrderDto } from 'lib/dtos/dto-order-service/create-order-dto';
import { UpdateOrderDto } from 'lib/dtos/dto-order-service/update-order-dto';

/**
 * Controller do microserviço de pedidos, expõe endpoints via RabbitMQ.
 */
@Controller()
export class OrderServiceController {
  constructor(private readonly orderService: OrderServiceService) {}

  /**
   * Cria um novo pedido.
   */
  @MessagePattern({ cmd: 'create-order' })
  createOrder(@Payload() data: CreateOrderDto) {
    return this.orderService.createOrder(data);
  }

  /**
   * Lista todos os pedidos de um usuário.
   */
  @MessagePattern({ cmd: 'list-orders-by-user' })
  listOrdersByUser(@Payload() userId: string) {
    return this.orderService.listOrdersByUser(userId);
  }

  /**
   * Busca um pedido pelo ID.
   */
  @MessagePattern({ cmd: 'get-order-by-id' })
  getOrderById(@Payload() id: string) {
    return this.orderService.getOrderById(id);
  }

  /**
   * Atualiza status ou dados do pedido.
   */
  @MessagePattern({ cmd: 'update-order' })
  updateOrder(@Payload() payload: { id: string; data: UpdateOrderDto }) {
    return this.orderService.updateOrder(payload.id, payload.data);
  }
}
