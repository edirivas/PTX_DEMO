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
import { CreateProductDto, ProductDto, UpdateProductDto } from './dtos/';
import { ProductsService } from './products.service';
import { ExceptionConstants } from 'src/constants';
import { plainToInstance } from 'class-transformer';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'To find all productos' })
  @Get()
  async findAll(): Promise<ProductDto[]> {
    const products = await this.productsService.findAll();

    const productsDto = products.map((product) =>
      plainToInstance(ProductDto, product, {
        excludeExtraneousValues: true,
      }),
    );

    return productsDto;
  }

  @ApiOperation({ summary: 'To find a product by id' })
  @ApiNotFoundResponse({ description: ExceptionConstants.entityNotFound })
  @Get('id/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    const product = await this.productsService.findById(id);

    if (!product)
      throw new NotFoundException(ExceptionConstants.entityNotFound);

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'To find a product by name' })
  @ApiNotFoundResponse({ description: ExceptionConstants.entityNotFound })
  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<ProductDto> {
    const product = await this.productsService.findByName(name);

    if (!product)
      throw new NotFoundException(ExceptionConstants.entityNotFound);

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'To create a product' })
  @ApiBadRequestResponse({
    description: ExceptionConstants.entityAlreadyExists,
  })
  @Post()
  async create(@Body() createProduct: CreateProductDto): Promise<ProductDto> {
    const product = await this.productsService.create(createProduct);

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'To update a product' })
  @ApiNotFoundResponse({ description: ExceptionConstants.entityNotFound })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = this.productsService.update(id, updateProduct);
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }
}
