import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { PinStatus } from 'src/enums';

export class CreatePinDto {
  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly pin_code: string;

  @IsNumber()
  @IsPositive()
  readonly selling_price: number;

  @IsEnum(PinStatus)
  readonly status: PinStatus;
}
