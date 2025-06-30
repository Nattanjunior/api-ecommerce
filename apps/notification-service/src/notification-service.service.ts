import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationServiceService {
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Processa uma notificação recebida (simula envio/log).
   */
  notify(tipo: string, data: any) {
    // Aqui pode ser integrado com e-mail, SMS, etc. Por enquanto, só loga.
    console.log(`[NOTIFICAÇÃO] ${tipo}:`, data);
    return { tipo, data, status: 'notificado' };
  }
}
