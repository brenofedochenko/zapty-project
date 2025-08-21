// ~/zapty-project/src/auth/entities/user.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 }) // <--- ADICIONE ESTA LINHA PARA O NOME
  name: string; // <--- ADICIONE ESTA LINHA PARA O NOME

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 50 })
  role: 'owner' | 'manager' | 'operator';

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}