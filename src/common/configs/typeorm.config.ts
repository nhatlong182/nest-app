import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { OrderDetailEntity } from 'src/entities/order-detail.entity';
import { cfg } from './env.config';

export const dataSourceOptions: DataSourceOptions = {
  type: cfg('DB_TYPE'),
  host: cfg('DB_HOST'),
  port: cfg('DB_PORT', Number),
  username: cfg('DB_USERNAME'),
  password: cfg('DB_PASSWORD'),
  database: cfg('DB_NAME'),
  logging: true,
  synchronize: true,
  migrationsRun: false,
  entities: [UserEntity, ProductEntity, OrderEntity, OrderDetailEntity],
  // migrations: ,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
