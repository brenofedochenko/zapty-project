// ~/zapty-project/src/products/dto/create-product.dto.ts
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio.' })
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'O preço do produto deve ser um número.' })
  @IsNotEmpty({ message: 'O preço do produto não pode ser vazio.' })
  price: number;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_sold_out?: boolean;

  @IsNumber({}, { message: 'O ID do tenant deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do tenant não pode ser vazio.' })
  tenant_id: number;

  @IsNumber({}, { message: 'O ID da categoria deve ser um número.' })
  @IsOptional()
  category_id?: number;
}