import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil',
});

@Injectable()
export class PaymentServiceService {

  /**
   * Processa pagamento via cartão de crédito
   */
  async payWithCard(amount: number, currency: string, cardDetails: any) {
    // Simulação: normalmente receberia token/id do cartão
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['card'],
      // payment_method_data/card pode ser usado para testes
    });
    return paymentIntent;
  }

  /**
   * Processa pagamento via boleto
   */
  async payWithBoleto(amount: number, currency: string, customer: any) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['boleto'],
      payment_method_options: {
        boleto: {
          expires_after_days: 3,
        },
      },
      customer,
    });
    return paymentIntent;
  }

  /**
   * Processa pagamento via pix
   */
  async payWithPix(amount: number, currency: string, customer: any) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['pix'],
      customer,
    });
    return paymentIntent;
  }
}
