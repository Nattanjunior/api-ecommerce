import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class UpdateNotificationDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
} 