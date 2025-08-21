// ~/zapty-project/src/tenants/dto/create-tenant.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  MaxLength,
} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do restaurante não pode ser vazio.' })
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O subdomínio não pode ser vazio.' })
  @MaxLength(255)
  subdomain: string;

  @IsObject()
  @IsOptional()
  config?: any; // Usamos 'any' por enquanto, mas pode ser tipado mais especificamente
}