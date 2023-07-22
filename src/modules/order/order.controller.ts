import {
  Body,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendResponse } from 'src/common/response/send-response';
import { createOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() query) {
    const allOrders = await this.orderService.getAll(query);
    return SendResponse.success(allOrders);
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  async getOrder(@Param('id') id: number) {
    const order = await this.orderService.getOrder(id);
    return SendResponse.success(order);
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async createOrder(@Req() req, @Body() body: createOrderDto) {
    return this.orderService.createOrder(5, body);
  }

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'))
  async updateOrder(
    @Req() req,
    @Param('id') id: number,
    @Body() body: createOrderDto,
  ) {
    return this.orderService.updateOrder(5, id, body);
  }
}
