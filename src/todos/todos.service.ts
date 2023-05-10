import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'nestjs-prisma';
import { TodoQuery } from './dto/Todo-query.dto';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        ...createTodoDto,
      },
    });
  }

  async findAll(query: TodoQuery): Promise<Todo[]> {
    let { skip, take, status, ...rest } = query;
    return await this.prisma.todo.findMany({
      orderBy: { ...rest },
      skip,
      take,
      where: { status },
    });
  }

  async findOne(id: number): Promise<Todo> {
    return await this.prisma.todo.findUnique({ where: { id } });
  }

  async update(id: number, userId: number, updateTodoDto: UpdateTodoDto) {
    let foundTodo = await this.prisma.todo.findUnique({
      where: { id },
    });

    this.checkFoundTodo(foundTodo, userId);
    return await this.prisma.todo.update({
      where: { id },
      data: {
        ...updateTodoDto,
      },
    });
  }

  async remove(id: number, userId: number): Promise<Todo> {
    let foundTodo = await this.prisma.todo.findUnique({ where: { id } });
    this.checkFoundTodo(foundTodo, userId);
    return await this.prisma.todo.delete({ where: { id } });
  }

  checkFoundTodo(foundTodo: Todo | undefined, userId: number) {
    if (!foundTodo) throw new NotFoundException('No Todo item found');
    if (foundTodo.ownerId !== userId)
      throw new ForbiddenException(
        'User is only allowed to update own todo item',
      );
  }
}
