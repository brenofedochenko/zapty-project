// ~/zapty-project/src/orders/dto/create-order.dto.ts
import { IsNumber, IsNotEmpty, IsString, IsEnum, IsArray } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { CreateOrderItemDto } from '../../order-items/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsNumber({}, { message: 'O ID do cliente deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do cliente não pode ser vazio.' })
  customer_id: number;

  @IsNumber({}, { message: 'O ID do tenant deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do tenant não pode ser vazio.' })
  tenant_id: number;

  @IsEnum(OrderStatus, { message: 'Status do pedido inválido.' })
  @IsNotEmpty({ message: 'O status do pedido não pode ser vazio.' })
  status: OrderStatus;

  @IsNumber({}, { message: 'O total deve ser um número.' })
  @IsNotEmpty({ message: 'O total não pode ser vazio.' })
  total_amount: number;

  @IsNumber({}, { message: 'A taxa de entrega deve ser um número.' })
  @IsNotEmpty({ message: 'A taxa de entrega não pode ser vazia.' })
  delivery_fee: number;

  @IsString()
  @IsNotEmpty({ message: 'O método de pagamento não pode ser vazio.' })
  payment_method: string;

  @IsArray()
  @IsNotEmpty({ message: 'A lista de itens não pode ser vazia.' })
  line_items: CreateOrderItemDto[];
}