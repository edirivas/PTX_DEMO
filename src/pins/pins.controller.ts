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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PinsService } from './pins.service';
import { ExceptionConstants } from 'src/constants';
import { CreatePinDto, PinDto, UpdatePinDto } from './dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('pins')
@Controller('pins')
export class PinsController {
  constructor(private pinsService: PinsService) {}

  @ApiOperation({ summary: 'To find all pins' })
  @Get()
  async findAll(): Promise<PinDto[]> {
    const pins = await this.pinsService.findAll();

    const pinsDto = pins.map((pin) =>
      plainToInstance(PinDto, pin, {
        excludeExtraneousValues: true,
      }),
    );

    return pinsDto;
  }

  @ApiOperation({ summary: 'To find a pin by pin_code' })
  @ApiNotFoundResponse({ description: ExceptionConstants.entityNotFound })
  @Get('pin_code/:pin_code')
  async findByPinCode(@Param('pin_code') pinCode: string): Promise<PinDto> {
    const pin = await this.pinsService.findByPinCode(pinCode);

    if (!pin) throw new NotFoundException(ExceptionConstants.entityNotFound);

    return plainToInstance(PinDto, pin, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'To create a pin' })
  @ApiBadRequestResponse({
    description: ExceptionConstants.entityAlreadyExists,
  })
  @Post()
  async create(@Body() createPin: CreatePinDto): Promise<PinDto> {
    const pin = await this.pinsService.create(createPin);

    return plainToInstance(PinDto, pin, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'To update a pin' })
  @ApiNotFoundResponse({ description: ExceptionConstants.entityNotFound })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePin: UpdatePinDto,
  ): Promise<PinDto> {
    const pin = this.pinsService.update(id, updatePin);
    return plainToInstance(PinDto, pin, {
      excludeExtraneousValues: true,
    });
  }
}
