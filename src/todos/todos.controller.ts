import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/auth/entities/auth.entity';
import { TodoQuery } from './dto/Todo-query.dto';
import {
  BadRequest,
  NotFound,
  Unauthorized,
} from 'src/exception/exception.decorator';

@Unauthorized()
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOkResponse({
    description: 'The todo item has been successfully created.',
    type: Todo,
  })
  @BadRequest('todo item')
  @NotFound('todo item')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: AuthRequest, @Body() createTodoDto: CreateTodoDto) {
    createTodoDto.ownerId = req.user.userId;
    return await this.todosService.create(createTodoDto);
  }

  @ApiOkResponse({ description: 'todo', type: Todo, isArray: true })
  @Get()
  async findAll(@Query() todoQuery: TodoQuery) {
    return await this.todosService.findAll(todoQuery);
  }

  @ApiOkResponse({ description: 'todo', type: Todo })
  @NotFound('todo item')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.todosService.findOne(id);
  }

  @ApiOkResponse({
    description: 'The todo item has been successfully updated',
    type: Todo,
  })
  @BadRequest('todo item')
  @NotFound('todo item')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todosService.update(id, req.user.username, updateTodoDto);
  }

  @ApiOkResponse({
    description: 'The todo item has been successfully deleted',
    type: Todo,
  })
  @NotFound('todo item')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.todosService.remove(id);
  }
}
