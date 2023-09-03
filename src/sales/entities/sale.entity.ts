import { Pin } from 'src/pins/entities/pin.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  sale_id: number;

  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn({ foreignKeyConstraintName: 'fk_product_id', name: 'product_id' })
  product: Product;

  @Column({ type: 'timestamp' })
  purchase_date: string;

  @OneToOne(() => Pin, (pin) => pin.sale)
  @JoinColumn({ foreignKeyConstraintName: 'fk_pin_id', name: 'pin_id' })
  pin: Pin;

  @Column({ type: 'int', unsigned: true, nullable: true })
  account_id: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  transfer_id: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  trx_id: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  pdv_id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  customer_phone: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  customer_email: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  customer_name: string;
}
