import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async getAll(query: any) {
    const { page = 1, perPage = 10 } = query;
    const list = await this.productRepo.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const total = await this.productRepo.count();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async createProduct(body: CreateProductDto) {
    const { productName, description } = body;

    const existingProduct = await this.productRepo.findOneBy({
      productName: productName,
    });

    if (existingProduct) return 'existingProduct';

    return await this.productRepo.save({
      productName,
      description,
    });
  }
}
