import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  quantity: number;
}
