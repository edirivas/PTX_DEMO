import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class SellPinDto {
  @IsNumber()
  @IsPositive()
  readonly product_id: number;

  @IsNumber()
  @IsPositive()
  readonly selling_price: number;

  @IsNumberString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(1, 45)
  readonly customer_phone: string;

  @IsEmail()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(1, 150)
  readonly customer_email: string;

  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(1, 150)
  readonly customer_name: string;
}
