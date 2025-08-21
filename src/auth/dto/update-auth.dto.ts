// ~/zapty-project/src/auth/dto/update-auth.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './create-auth.dto'; // Usa o RegisterUserDto como base

export class UpdateAuthDto extends PartialType(RegisterUserDto) {}