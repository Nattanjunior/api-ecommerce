import { IsString, IsInt, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class UpdateOrderItemDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
} 