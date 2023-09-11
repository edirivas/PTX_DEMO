import { Body, Controller, Post, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionConstants, StatusCodeConstants } from 'src/constants';
import { plainToInstance } from 'class-transformer';
import { SaleDto, SellPinDto } from './dtos';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @ApiOperation({ summary: 'To find all sales' })
  @Get()
  async findAll(): Promise<SaleDto[]> {
    const sales = await this.salesService.findAll();

    const salesDto = sales.map((sale) =>
      plainToInstance(SaleDto, sale, {
        excludeExtraneousValues: true,
      }),
    );

    return salesDto;
  }

  @ApiOperation({ summary: 'To sale a pin' })
  @ApiNotFoundResponse({ description: ExceptionConstants.entityNotFound })
  @ApiResponse({
    status: StatusCodeConstants.NoPinsAvailableForSale,
    description: ExceptionConstants.NoPinsAvailableForSale,
  })
  @Post('pin')
  async create(@Body() sellPinDto: SellPinDto): Promise<SaleDto> {
    const sale = await this.salesService.sellPin(sellPinDto);

    return plainToInstance(SaleDto, sale, {
      excludeExtraneousValues: true,
    });
  }
}
