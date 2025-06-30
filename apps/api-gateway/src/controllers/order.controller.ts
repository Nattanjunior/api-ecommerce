import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from 'lib/dtos/dto-order-service/create-order-dto';
import { UpdateOrderDto } from 'lib/dtos/dto-order-service/update-order-dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Listar pedidos por usuário' })
  @ApiParam({ name: 'userId', required: true })
  @Get('user/:userId')
  listOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.listOrdersByUser(userId);
  }

  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @ApiOperation({ summary: 'Criar pedido' })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Atualizar pedido' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateOrderDto })
  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
} 