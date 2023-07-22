import { CreateProductDto } from './dto/product.dto';
import { Body, Delete, Param, Post, Put } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAllProducts(@Query() query) {
    return this.productsService.getAll(query);
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() body: CreateProductDto) {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
