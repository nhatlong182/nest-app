import { AuthModule } from 'src/modules/auth/auth.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ProductModule } from 'src/modules/product/product.module';
import { UserModule } from 'src/modules/user/user.module';

export const Routes = [
  {
    path: 'api',
    children: [
      {
        path: '/',
        module: AuthModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
      {
        path: 'products',
        module: ProductModule,
      },
      {
        path: 'orders',
        module: OrderModule,
      },
    ],
  },
];
