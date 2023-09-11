import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionConstants, StatusCodeConstants } from 'src/constants';
import { SaleDto } from './dtos/sale.dto';
import { plainToInstance } from 'class-transformer';
import { SellPinDto } from './dtos/sell-pin.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

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
