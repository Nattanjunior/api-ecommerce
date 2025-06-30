import { Controller } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @MessagePattern({ cmd: 'pay-with-card' })
  payWithCard(@Payload() data: { amount: number; currency: string; cardDetails: any }) {
    return this.paymentServiceService.payWithCard(data.amount, data.currency, data.cardDetails);
  }

  @MessagePattern({ cmd: 'pay-with-boleto' })
  payWithBoleto(@Payload() data: { amount: number; currency: string; customer: any }) {
    return this.paymentServiceService.payWithBoleto(data.amount, data.currency, data.customer);
  }

  @MessagePattern({ cmd: 'pay-with-pix' })
  payWithPix(@Payload() data: { amount: number; currency: string; customer: any }) {
    return this.paymentServiceService.payWithPix(data.amount, data.currency, data.customer);
  }
}
