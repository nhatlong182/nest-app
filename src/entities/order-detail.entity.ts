import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'order_detail' })
export class OrderDetailEntity extends Base {
  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, (OrderEntity) => OrderEntity.order_details)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(
    () => ProductEntity,
    (ProductEntity) => ProductEntity.order_details,
    { eager: true },
  )
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
