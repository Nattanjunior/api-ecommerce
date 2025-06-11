import { IsString, IsNotEmpty, IsNumber, IsUUID, IsEnum } from 'class-validator';

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  orderId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus;
} 