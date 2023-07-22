import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class createOrderDto {
  @IsArray()
  products: [
    {
      productId: number;
      quantity: number;
    },
  ];
}
