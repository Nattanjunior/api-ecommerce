import { IsString, IsNotEmpty, IsBoolean, IsUUID, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
} 