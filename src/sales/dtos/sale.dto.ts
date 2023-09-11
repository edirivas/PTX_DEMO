import { Expose, Type } from 'class-transformer';
import { PinDto } from 'src/pins/dtos';
import { ProductDto } from 'src/products/dtos';

export class SaleDto {
  @Expose()
  sale_id: number;

  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;

  @Expose()
  purchase_date: string;

  @Expose()
  @Type(() => PinDto)
  pin: PinDto;

  @Expose()
  account_id: number;

  @Expose()
  transfer_id: number;

  @Expose()
  trx_id: number;

  @Expose()
  pdv_id: number;

  @Expose()
  customer_phone: string;

  @Expose()
  customer_email: string;

  @Expose()
  customer_name: string;
}
