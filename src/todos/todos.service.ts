import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'nestjs-prisma';
import { TodoQuery } from './dto/Todo-query.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({ data: { ...createTodoDto } });
  }

  async findAll(query: TodoQuery) {
    let { skip, take, status } = query;
    return await this.prisma.todo.findMany({ skip, take, where: { status } });
  }

  async findOne(id: number) {
    return await this.prisma.todo.findUnique({ where: { id } });
  }

  async update(id: number, username: string, updateTodoDto: UpdateTodoDto) {
    let foundTodo = await this.prisma.todo.findUnique({
      where: { id },
      include: { owner: true },
    });
    if (!foundTodo) throw new NotFoundException('No Todo item found');
    let owner = foundTodo.owner.username;
    if (owner !== username)
      throw new BadRequestException(
        'User is only allowed to update own todo item',
      );
    return await this.prisma.todo.update({
      where: { id },
      data: {
        ...updateTodoDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({ where: { id } });
  }
}
