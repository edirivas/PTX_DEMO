import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, ProductDto } from './dtos/';
import { ProductsService } from './products.service';
import { ExceptionConstants } from 'src/constants';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(@Body() createProduct: CreateProductDto): Promise<ProductDto> {
    const product = await this.productsService.create(createProduct);

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @Get('id/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findById(id);

    if (!product)
      throw new NotFoundException(ExceptionConstants.entityNotFound);

    return plainToInstance(ProductDto, product);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    const product = await this.productsService.findByName(name);

    if (!product)
      throw new NotFoundException(ExceptionConstants.entityNotFound);

    return plainToInstance(ProductDto, product);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = this.productsService.update(id, updateProduct);
    return plainToInstance(ProductDto, product);
  }
}
