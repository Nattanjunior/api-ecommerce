import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from 'lib/dtos/dto-notification-service/create-notification-dto';
import { UpdateNotificationDto } from 'lib/dtos/dto-notification-service/update-notification-dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(@Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy) {}

  async findAllNotifications() {
    return await firstValueFrom(this.notificationClient.send({ cmd: 'find-all-notifications' }, {}));
  }

  async findNotification(id: string) {
    return await firstValueFrom(this.notificationClient.send({ cmd: 'find-notification' }, id));
  }

  async createNotification(data: CreateNotificationDto) {
    return await firstValueFrom(this.notificationClient.send({ cmd: 'create-notification' }, data));
  }

  async updateNotification(id: string, data: UpdateNotificationDto) {
    return await firstValueFrom(this.notificationClient.send({ cmd: 'update-notification' }, { id, data }));
  }

  async deleteNotification(id: string) {
    return await firstValueFrom(this.notificationClient.send({ cmd: 'delete-notification' }, id));
  }
} 