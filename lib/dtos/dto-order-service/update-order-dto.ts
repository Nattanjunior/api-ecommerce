import { IsString, IsArray, ValidateNested, IsOptional, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderItemDto } from './update-order-item-dto';

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  @IsOptional()
  items?: UpdateOrderItemDto[];
} 