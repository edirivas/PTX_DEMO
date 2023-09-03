import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Pin } from './entities/pin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePinDto, UpdatePinDto } from './dtos';
import { ExceptionConstants } from 'src/constants';

@Injectable()
export class PinsService {
  constructor(
    @InjectRepository(Pin)
    private pinsRepository: Repository<Pin>,
  ) {}

  /**
   * Metodo para consultar todos los pines existentes
   * @returns Pin[] arreglo de pines
   */
  async findAll(): Promise<Pin[]> {
    return await this.pinsRepository.find();
  }

  /**
   * Método para consultar un pin dada la cadena alfanumércia que conforma el pin
   * @param pinCode cadena alfanumércia que conforma el PIN
   * @returns Pin
   */
  async findByPinCode(pinCode: string): Promise<Pin | null> {
    return await this.pinsRepository.findOneBy({
      pin_code: pinCode,
    });
  }

  /**
   * Método para registrar un pin en base de datos
   * @param newPin de tipo CreatePinDto
   * @returns Pin
   */
  async create(newPin: CreatePinDto): Promise<Pin> {
    const pinFound = await this.findByPinCode(newPin.pin_code);

    if (pinFound)
      throw new BadRequestException(ExceptionConstants.entityAlreadyExists);

    const pin = this.pinsRepository.create(newPin);
    return await this.pinsRepository.save(pin);
  }

  /**
   * Método para actualizar un pin dado el ID y las propiedades
   * @param pin_id ID del pin que se va a actualizar
   * @param updatePin Propiedades del pin
   * @returns Pin
   */
  async update(pin_id: number, updatePin: UpdatePinDto): Promise<Pin> {
    const update = {
      pin_id,
      ...updatePin,
    };

    const pin = await this.pinsRepository.preload(update);

    if (!pin) throw new NotFoundException(ExceptionConstants.entityNotFound);

    return this.pinsRepository.save(pin);
  }
}
