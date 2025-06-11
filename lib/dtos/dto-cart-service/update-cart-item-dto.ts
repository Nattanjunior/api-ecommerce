import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateCartItemDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsInt()
  @IsOptional()
  quantity?: number;
} 