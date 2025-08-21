// ~/zapty-project/src/auth/dto/create-auth.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class RegisterUserDto { // Renomeie para RegisterUserDto para ser mais específico
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string; // Para o nome do usuário

  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }) // Requisito de segurança
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O papel (role) não pode ser vazio.' })
  @IsEnum(['owner', 'manager', 'operator'], { message: 'Papel inválido. Escolha entre owner, manager ou operator.' })
  role: 'owner' | 'manager' | 'operator';

  @IsNumber({}, { message: 'O ID do tenant deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do tenant não pode ser vazio.' })
  tenant_id: number;
}

