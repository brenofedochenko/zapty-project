// ~/zapty-project/src/orders/entities/order.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne, // Para a relação com Tenant
  JoinColumn,
  OneToMany, // Para a relação com OrderItem
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity'; // Importe a entidade Tenant
import { OrderItem } from '../order-items/entities/order-item.entity'; // Importe a entidade OrderItem (precisaremos criá-la)
import { Customer } from '../../customers/entities/customer.entity'; // Importe a entidade Customer (precisaremos criá-la)

// Enum para o status do pedido
export enum OrderStatus {
  PENDING_PAYMENT = 'pending_payment',
  RECEIVED = 'received',
  PREPARING = 'preparing',
  READY_FOR_DELIVERY = 'ready_for_delivery',
  IN_ROUTE = 'in_route',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: number;

  @ManyToOne(() => Customer) // Relação com o cliente que fez o pedido
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  customer_id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_PAYMENT })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  delivery_fee: number;

  @Column()
  payment_method: string;

  @Column({ type: 'jsonb', nullable: true })
  delivery_address: any;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  line_items: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}