import { CreateProductDto } from './dto/product.dto';
import { Body, Post } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAllProducts(@Query() query) {
    return this.productsService.getAll(query);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }
}
