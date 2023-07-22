import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-response';
import code from 'src/common/response/status-code';
import { OrderDetailEntity } from 'src/entities/order-detail.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private orderDetailRepo: Repository<OrderDetailEntity>,
  ) {}

  async getAll(query: any) {
    const { page = 1, perPage = 10 } = query;
    const orders = await this.orderRepo.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const list = orders;
    const total = await this.orderRepo.count();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async getOrder(orderId: number) {
    const order = await this.orderRepo.findOneBy({ id: orderId });

    if (!order)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code.NOT_FOUND.code,
        code.NOT_FOUND.type,
      );

    return order;
  }

  async createOrder(userId: number, body: createOrderDto) {
    try {
      const products = body.products;
      const user = await this.userRepo.findOneBy({ id: userId });
      const newOrder = this.orderRepo.create({ user: user });

      await this.orderRepo.save(newOrder);

      products.forEach(async (product) => {
        const prod = await this.productRepo.findOneBy({
          id: product.productId,
        });
        const orderDetail = this.orderDetailRepo.create({
          order: newOrder,
          product: prod,
          quantity: product.quantity,
        });
        await this.orderDetailRepo.save(orderDetail);
      });

      return newOrder;
    } catch (error) {
      throw new ErrorException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        code.BACKEND.code,
        code.BACKEND.type,
      );
    }
  }

  async updateOrder(userId: number, orderId: number, body: createOrderDto) {}
}
