import { HttpException } from '@nestjs/common';
import { ExceptionConstants, StatusCodeConstants } from 'src/constants';

export class NoPinsAvailableForSaleException extends HttpException {
  constructor() {
    super(
      ExceptionConstants.NoPinsAvailableForSale,
      StatusCodeConstants.NoPinsAvailableForSale,
    );
  }
}
