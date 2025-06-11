import { IsString, IsInt, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
} 