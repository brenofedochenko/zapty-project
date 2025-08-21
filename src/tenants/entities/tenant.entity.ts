// ~/zapty-project/src/tenants/entities/tenant.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tenants' }) // Define o nome da tabela no banco de dados
export class Tenant {
  @PrimaryGeneratedColumn('increment') // Coluna ID auto-incrementável
  id: number;

  @Column({ length: 255 }) // Coluna para o nome do restaurante
  name: string;

  @Column({ unique: true, length: 255 }) // Coluna para o subdomínio, deve ser único
  subdomain: string;

  @Column({ type: 'jsonb', nullable: true }) // Coluna para configurações em formato JSONB, pode ser nula
  config: any; // Tipo 'any' por enquanto, pode ser mais específico depois

  @CreateDateColumn({ name: 'created_at' }) // Coluna para a data de criação, preenchida automaticamente
  createdAt: Date;
}