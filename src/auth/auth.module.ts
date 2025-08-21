// ~/zapty-project/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Importe o JwtModule

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'umSegredoMuitoSecreto', // Use uma variável de ambiente real em produção!
      signOptions: { expiresIn: '60s' }, // Token expira em 60 segundos (ajuste conforme necessidade)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}