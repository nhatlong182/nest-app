import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-response';
import code from 'src/common/response/status-code';
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

  async getProduct(productId: number) {
    const product = await this.productRepo.findOneBy({ id: productId });

    if (!product)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code.NOT_FOUND.code,
        code.NOT_FOUND.type,
      );

    return product;
  }

  async createProduct(body: CreateProductDto) {
    const { productName, description, quantity } = body;

    const existingProduct = await this.productRepo.findOneBy({
      productName: productName,
    });

    if (existingProduct)
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code.PRODUCT_EXISTED.code,
        code.PRODUCT_EXISTED.type,
      );

    return await this.productRepo.save({
      productName,
      description,
      quantity: Number(quantity),
    });
  }

  async updateProduct(id: number, body: CreateProductDto) {
    try {
      const { productName, description } = body;

      const existingProduct = await this.productRepo.findOneBy({ id });

      if (!existingProduct)
        throw new ErrorException(
          HttpStatus.NOT_FOUND,
          code.NOT_FOUND.code,
          code.NOT_FOUND.type,
        );

      existingProduct.productName = productName;
      existingProduct.description = description;

      return await this.productRepo.save(existingProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepo.findOneBy({ id });
      if (!product) {
        throw new ErrorException(
          HttpStatus.NOT_FOUND,
          code.NOT_FOUND.code,
          code.NOT_FOUND.type,
        );
      }
      product.deleted = new Date();
      await this.productRepo.save(product);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
