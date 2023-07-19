import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { OrderDetailEntity } from './order-detail.entity';

@Entity({ name: 'product' })
export class ProductEntity extends Base {
  @Column({ name: 'product_name', unique: true })
  productName: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @OneToMany(
    () => OrderDetailEntity,
    (OrderDetailEntity) => OrderDetailEntity.product,
  )
  order_details: OrderDetailEntity[];
}
