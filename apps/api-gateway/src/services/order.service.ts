import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'lib/dtos/dto-order-service/create-order-dto';
import { UpdateOrderDto } from 'lib/dtos/dto-order-service/update-order-dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) {}

  async findAllOrders() {
    return await firstValueFrom(this.orderClient.send({ cmd: 'find-all-orders' }, {}));
  }

  async findOrder(id: string) {
    return await firstValueFrom(this.orderClient.send({ cmd: 'find-order' }, id));
  }

  async listOrdersByUser(userId: string) {
    return await firstValueFrom(this.orderClient.send({ cmd: 'list-orders-by-user' }, userId));
  }

  async getOrderById(id: string) {
    return await firstValueFrom(this.orderClient.send({ cmd: 'get-order-by-id' }, id));
  }

  async createOrder(data: CreateOrderDto) {
    return await firstValueFrom(this.orderClient.send({ cmd: 'create-order' }, data));
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    return await firstValueFrom(this.orderClient.send({ cmd: 'update-order' }, { id, data }));
  }

  async deleteOrder(id: string) {
    return await firstValueFrom(this.orderClient.send({ cmd: 'delete-order' }, id));
  }
} 