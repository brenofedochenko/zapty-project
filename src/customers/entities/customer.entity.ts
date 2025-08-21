// ~/zapty-project/src/customers/entities/customer.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne, // Para a relação com Tenant
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 }) // Nome do cliente
  name: string;

  @Column({ length: 20 }) // Número de telefone do cliente
  phone_number: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' }) // Um cliente pertence a um Tenant
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column() // Chave estrangeira para o Tenant
  tenant_id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}