import { Expose } from 'class-transformer';

export class PinDto {
  @Expose()
  readonly pin_id: number;

  @Expose()
  readonly pin_code: string;

  @Expose()
  readonly loading_date: string;

  @Expose()
  readonly selling_price: number;

  @Expose()
  readonly purchase_date: string;

  @Expose()
  status: string;
}
