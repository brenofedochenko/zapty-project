// ~/zapty-project/src/order-items/dto/create-order-item.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  @IsNotEmpty({ message: 'A quantidade não pode ser vazia.' })
  quantity: number;

  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsNotEmpty({ message: 'O preço não pode ser vazio.' })
  price: number;

  @IsNumber({}, { message: 'O ID do pedido deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do pedido não pode ser vazio.' })
  order_id: number;

  @IsNumber({}, { message: 'O ID do produto deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do produto não pode ser vazio.' })
  product_id: number;
}