import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'nvarchar', name: 'full_name' })
  fullName: string;

  @OneToMany(() => OrderEntity, (OrderEntity) => OrderEntity.user)
  orders: OrderEntity[];
}
