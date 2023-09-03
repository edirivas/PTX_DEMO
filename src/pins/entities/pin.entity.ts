import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pin {
  @PrimaryGeneratedColumn()
  pin_id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  pin_code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  loading_date: string;

  @Column({ type: 'decimal', precision: 9, scale: 2, unsigned: true })
  selling_price: number;

  @Column({ type: 'timestamp', nullable: true })
  purchase_date: string;

  @Column({ type: 'varchar', length: 200 })
  status: string;

  @OneToOne(() => Sale, (sale) => sale.pin)
  sale: Sale;
}
