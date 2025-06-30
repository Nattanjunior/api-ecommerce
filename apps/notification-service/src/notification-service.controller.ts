import { Controller, Get } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @Get()
  getHello(): string {
    return this.notificationServiceService.getHello();
  }

  @MessagePattern({ cmd: 'notify-order-created' })
  notifyOrderCreated(@Payload() data: any) {
    return this.notificationServiceService.notify('Pedido criado', data);
  }

  @MessagePattern({ cmd: 'notify-purchase-finished' })
  notifyPurchaseFinished(@Payload() data: any) {
    return this.notificationServiceService.notify('Compra finalizada', data);
  }

  @MessagePattern({ cmd: 'notify-cart-item-added' })
  notifyCartItemAdded(@Payload() data: any) {
    return this.notificationServiceService.notify('Item adicionado ao carrinho', data);
  }

  @MessagePattern({ cmd: 'notify-cart-item-removed' })
  notifyCartItemRemoved(@Payload() data: any) {
    return this.notificationServiceService.notify('Item removido do carrinho', data);
  }
}
