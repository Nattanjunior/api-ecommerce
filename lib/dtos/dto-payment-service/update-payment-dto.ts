import { IsString, IsOptional, IsNumber, IsUUID, IsEnum } from 'class-validator';

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class UpdatePaymentDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;
} 