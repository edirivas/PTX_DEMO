import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'varchar', length: 200 })
  display_text: string;

  @Column({ type: 'varchar', length: 200 })
  characteristics: string;

  @Column({ type: 'varchar', length: 200 })
  logo_path: string;

  @OneToMany(() => Sale, (sale) => sale.product)
  sales: Sale[];
}
