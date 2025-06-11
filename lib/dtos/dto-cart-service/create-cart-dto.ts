import { IsString, IsNotEmpty, IsArray, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from './create-cart-item-dto';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  items: CreateCartItemDto[];
} 