import { Injectable, NotFoundException } from '@nestjs/common';
import { Pin } from 'src/pins/entities/pin.entity';
import { DataSource } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { NoPinsAvailableForSaleException } from 'src/exceptions';
import { SellPinDto } from './dtos/sell-pin.dto';
import { ProductsService } from 'src/products/products.service';
import { ExceptionConstants } from 'src/constants';
import { PinStatus } from 'src/enums';

@Injectable()
export class SalesService {
  constructor(
    private dataSource: DataSource,
    private productsService: ProductsService,
  ) {}

  /**
   * Método para realizar la venta de un pin
   * @param sellPinDto Objeto con información del pin, producto y cliente
   * @returns Sale
   */
  async sellPin(sellPinDto: SellPinDto): Promise<Sale> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.productsService.findById(
        sellPinDto.product_id,
      );

      if (!product)
        throw new NotFoundException(ExceptionConstants.entityNotFound);

      const pin = await queryRunner.manager
        .createQueryBuilder(Pin, 'pin')
        .where('pin.selling_price = :sellingPrice', {
          sellingPrice: sellPinDto.selling_price,
        })
        .andWhere('pin.status = :status', { status: PinStatus.Available })
        .orderBy('pin.loading_date', 'ASC')
        .limit(1)
        .setLock('pessimistic_write')
        .setOnLocked('skip_locked')
        .getOne();

      if (!pin) throw new NoPinsAvailableForSaleException();

      pin.purchase_date = new Date().toISOString();
      pin.status = PinStatus.Sold;

      await queryRunner.manager.save(pin);

      const saleToCreate = {
        product,
        pin,
        ...sellPinDto,
      };

      const sale = queryRunner.manager.create(Sale, saleToCreate);
      await queryRunner.manager.save(sale);

      await queryRunner.commitTransaction();

      return sale;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
