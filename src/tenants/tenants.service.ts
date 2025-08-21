// ~/zapty-project/src/tenants/tenants.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant) // Injeta o repositório da entidade Tenant
    private tenantsRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const newTenant = this.tenantsRepository.create(createTenantDto); // Cria uma nova instância de Tenant
    return this.tenantsRepository.save(newTenant); // Salva no banco de dados
  }

  findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find(); // Busca todos os tenants no banco
  }

  async findOne(id: number): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant com ID "${id}" não encontrado.`);
    }
    return tenant;
  }

  async update(id: number, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    // Primeiro, verifica se o tenant existe
    const tenantToUpdate = await this.findOne(id); // Reutiliza o findOne para validar a existência

    // Aplica as atualizações e salva
    this.tenantsRepository.merge(tenantToUpdate, updateTenantDto);
    return this.tenantsRepository.save(tenantToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tenantsRepository.delete(id); // Tenta deletar o tenant
    if (result.affected === 0) {
      throw new NotFoundException(`Tenant com ID "${id}" não encontrado para remoção.`);
    }
    // Não retorna nada em caso de sucesso (void)
  }
}