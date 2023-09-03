import {
  BadRequestException,
  Injectable,
  //Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos';
import { ExceptionConstants } from 'src/constants';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  //private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  /**
   * Metodo para consultar todos los productos existentes
   * @returns Product[] arreglo de productos
   */
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  /**
   * Método para consultar un producto dado el ID
   * @param id ID del producto
   * @returns Product
   */
  async findById(id: number): Promise<Product | null> {
    return await this.productsRepository.findOneBy({
      product_id: id,
    });
  }

  /**
   * Método para consultar un producto dado el nombre
   * @param name Nombre del producto
   * @returns Product
   */
  async findByName(name: string): Promise<Product | null> {
    return await this.productsRepository.findOneBy({
      name: name,
    });
  }

  /**
   * Método para registrar un producto en base de datos
   * @param newProduct de tipo CreateProductDto
   * @returns Product
   */
  async create(newProduct: CreateProductDto): Promise<Product> {
    const productFound = await this.findByName(newProduct.name);

    if (productFound)
      throw new BadRequestException(ExceptionConstants.entityAlreadyExists);

    const product = this.productsRepository.create(newProduct);
    return await this.productsRepository.save(product);
  }

  /**
   * Método para actualizar un producto dado el ID y las propiedades
   * @param product_id ID del producto que se va a actualizar
   * @param updateProduct Propiedades del producto
   * @returns Product
   */
  async update(
    product_id: number,
    updateProduct: UpdateProductDto,
  ): Promise<Product> {
    const update = {
      product_id,
      ...updateProduct,
    };

    const product = await this.productsRepository.preload(update);

    if (!product)
      throw new NotFoundException(ExceptionConstants.entityNotFound);

    return this.productsRepository.save(product);
  }
}
