import { IsString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
} 