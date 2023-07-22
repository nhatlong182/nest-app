import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { OrderDetailEntity } from './order-detail.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'order' })
export class OrderEntity extends Base {
  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.orders, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(
    () => OrderDetailEntity,
    (OrderDetailEntity) => OrderDetailEntity.order,
    { eager: true },
  )
  order_details: OrderDetailEntity[];
}
