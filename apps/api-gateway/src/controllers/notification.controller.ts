import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from 'lib/dtos/dto-notification-service/create-notification-dto';
import { UpdateNotificationDto } from 'lib/dtos/dto-notification-service/update-notification-dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll() {
    return this.notificationService.findAllNotifications();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findNotification(id);
  }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.updateNotification(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
} 