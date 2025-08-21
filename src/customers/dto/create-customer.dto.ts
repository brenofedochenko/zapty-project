// ~/zapty-project/src/customers/dto/create-customer.dto.ts
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do cliente não pode ser vazio.' })
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O número de telefone não pode ser vazio.' })
  @MaxLength(20)
  phone_number: string;
}