import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreatePinDto {
  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly pin_code: string;

  @IsNumber()
  @IsPositive()
  readonly selling_price: number;

  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(1, 200)
  readonly status: string;
}
