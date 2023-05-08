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
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/auth/entities/auth.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOkResponse({ description: 'todo', type: Todo })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @ApiOkResponse({ description: 'todo', type: Todo, isArray: true })
  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @ApiOkResponse({ description: 'todo', type: Todo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(+id);
  }

  @ApiOkResponse({ description: 'todo', type: Todo })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todosService.update(id, req.user.username, updateTodoDto);
  }

  @ApiOkResponse({ description: 'todo', type: Todo })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todosService.remove(+id);
  }
}
