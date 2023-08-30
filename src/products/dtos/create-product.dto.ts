import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly name: string;

  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly description: string;

  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly display_text: string;

  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly characteristics: string;

  @IsString()
  @Transform(({ value }) => (typeof value == 'string' ? value.trim() : value))
  @Length(5, 200)
  readonly logo_path: string;
}
