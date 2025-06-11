import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from 'lib/dtos/dto-payment-service/create-payment-dto';
import { UpdatePaymentDto } from 'lib/dtos/dto-payment-service/update-payment-dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(@Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy) {}

  async findAllPayments() {
    return await firstValueFrom(this.paymentClient.send({ cmd: 'find-all-payments' }, {}));
  }

  async findPayment(id: string) {
    return await firstValueFrom(this.paymentClient.send({ cmd: 'find-payment' }, id));
  }

  async createPayment(data: CreatePaymentDto) {
    return await firstValueFrom(this.paymentClient.send({ cmd: 'create-payment' }, data));
  }

  async updatePayment(id: string, data: UpdatePaymentDto) {
    return await firstValueFrom(this.paymentClient.send({ cmd: 'update-payment' }, { id, data }));
  }

  async deletePayment(id: string) {
    return await firstValueFrom(this.paymentClient.send({ cmd: 'delete-payment' }, id));
  }
} 