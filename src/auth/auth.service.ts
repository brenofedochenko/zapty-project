// ~/zapty-project/src/auth/auth.service.ts
import {
  Injectable,
  ConflictException, // Para email já existente
  UnauthorizedException, // Para credenciais inválidas
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; // Importe bcryptjs
import { JwtService } from '@nestjs/jwt'; // Importe JwtService

import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/create-auth.dto'; // DTO para registro
import { LoginUserDto } from './dto/login-auth.dto'; // DTO para login (você criou este arquivo)

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Injeta o JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    // 1. Verificar se o email já existe
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Este email já está em uso.');
    }

    // 2. Hash da senha
    const salt = await bcrypt.genSalt(10); // Gera um "sal" para o hash
    const password_hash = await bcrypt.hash(registerUserDto.password, salt); // Gera o hash da senha

    // 3. Criar e salvar o novo usuário
    const newUser = this.usersRepository.create({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password_hash, // Salva o hash da senha
      role: registerUserDto.role,
      tenant_id: registerUserDto.tenant_id,
    });

    await this.usersRepository.save(newUser);

    // Solução para remover a senha antes de retornar o objeto do usuário de forma segura:
    const { password_hash: _, ...userWithoutPassword } = newUser; // Desestrutura para omitir a senha
    return userWithoutPassword; // Retorna o objeto do usuário sem o hash da senha
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // 1. Encontrar o usuário pelo email
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'email', 'password_hash', 'role', 'tenant_id'], // Seleciona o hash da senha para comparação
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // 2. Comparar a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // 3. Gerar e retornar o token JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenant_id, // Inclui o tenantId no payload do token
    };
    return {
      access_token: this.jwtService.sign(payload), // Assina o payload para gerar o token
    };
  }

  // Você pode ter outros métodos como findUserById, validateUser (para guarda de autenticação), etc.
}