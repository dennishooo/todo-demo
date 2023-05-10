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
  ForbiddenException,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  BadRequest,
  Conflict,
  Forbidden,
  NotFound,
  Unauthorized,
} from 'src/exception/exception.decorator';
import { AuthRequest } from 'src/auth/entities/auth.entity';

@ApiTags('users')
@Controller('users')
@Unauthorized()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'user', type: User })
  @BadRequest('user')
  @Conflict('user')
  @Post()
  create(@Body() createTodoDto: CreateUserDto) {
    return this.usersService.create(createTodoDto);
  }

  @ApiOkResponse({ description: 'user', type: User, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ description: 'user', type: User })
  @NotFound('user')
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @ApiOkResponse({ description: 'user', type: User })
  @UseGuards(JwtAuthGuard)
  @Forbidden()
  @Conflict('user')
  @BadRequest('user')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (req.user.userId !== id)
      throw new ForbiddenException(
        'User is only allowed to modify own account.',
      );
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse({ description: 'user', type: User })
  @UseGuards(JwtAuthGuard)
  @Forbidden()
  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    if (req.user.userId !== id)
      throw new ForbiddenException(
        'User is only allowed to delete own account.',
      );

    return this.usersService.remove(id);
  }
}
