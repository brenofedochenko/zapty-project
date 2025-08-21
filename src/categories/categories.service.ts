// ~/zapty-project/src/categories/categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) // Injeta o repositório da entidade Category
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryDto); // Cria uma nova instância de Category
    return this.categoriesRepository.save(newCategory); // Salva no banco de dados
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find(); // Busca todas as categorias no banco
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada.`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    // Primeiro, verifica se a categoria existe
    const categoryToUpdate = await this.findOne(id); // Reutiliza o findOne para validar a existência

    // Aplica as atualizações e salva
    this.categoriesRepository.merge(categoryToUpdate, updateCategoryDto);
    return this.categoriesRepository.save(categoryToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriesRepository.delete(id); // Tenta deletar a categoria
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada para remoção.`);
    }
    // Não retorna nada em caso de sucesso (void)
  }
}