// ~/zapty-project/src/tenants/tenants.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importe TypeOrmModule
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { Tenant } from './entities/tenant.entity'; // Importe a entidade Tenant

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])], // <-- Adicione esta linha com a entidade Tenant
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}