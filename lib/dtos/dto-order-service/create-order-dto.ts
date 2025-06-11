import { IsString, IsNotEmpty, IsArray, ValidateNested, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item-dto';

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
} 