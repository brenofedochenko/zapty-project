// ~/zapty-project/src/order-items/order-items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const newOrderItem = this.orderItemsRepository.create(createOrderItemDto);
    return this.orderItemsRepository.save(newOrderItem);
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemsRepository.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findOne({ where: { id } });
    if (!orderItem) {
      throw new NotFoundException(`Item de pedido com ID "${id}" não encontrado.`);
    }
    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItemToUpdate = await this.findOne(id);
    this.orderItemsRepository.merge(orderItemToUpdate, updateOrderItemDto);
    return this.orderItemsRepository.save(orderItemToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item de pedido com ID "${id}" não encontrado para remoção.`);
    }
  }
}