// ~/zapty-project/src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'; // Mantenha Patch, Delete se for usar para outros DTOs de usuário, senão pode remover
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/create-auth.dto'; // <--- CORREÇÃO AQUI: Renomeado de CreateAuthDto
import { LoginUserDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto'; // Importe o UpdateAuthDto se ainda não o fez

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Endpoint para registro de novo usuário/tenant
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login') // Endpoint para login
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Métodos CRUD genéricos gerados pelo NestJS CLI que não são necessários para a autenticação direta.
  // Você pode removê-los ou adaptá-los para gerenciar usuários se for o caso.
  // Por agora, vamos removê-los para resolver os erros de build.

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}