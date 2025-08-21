// ~/zapty-project/src/categories/dto/create-category.dto.ts
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria não pode ser vazio.' })
  @MaxLength(255)
  name: string;

  @IsNumber({}, { message: 'O ID do tenant deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do tenant não pode ser vazio.' })
  tenant_id: number;
}