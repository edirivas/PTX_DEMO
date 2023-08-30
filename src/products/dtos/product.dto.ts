import { Expose } from 'class-transformer';

export class ProductDto {
  @Expose()
  readonly product_id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly display_text: string;

  @Expose()
  readonly characteristics: string;

  @Expose()
  readonly logo_path: string;
}
