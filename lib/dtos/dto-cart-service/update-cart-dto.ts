import { IsString, IsArray, ValidateNested, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateCartItemDto } from './update-cart-item-dto';

export class UpdateCartDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCartItemDto)
  @IsOptional()
  items?: UpdateCartItemDto[];
} 