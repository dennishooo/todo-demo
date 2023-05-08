import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Todo } from 'src/todos/entities/todo.entity';

export class User {
  @ApiProperty({ default: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ default: 'dennis' })
  @IsString()
  username: string;

  @ApiProperty({ default: 'HiLfx123!' })
  @IsString()
  @MinLength(6)
  password: string;

  // @ApiProperty()
  @IsDateString()
  @IsOptional()
  createdAt: Date;

  // @ApiProperty()
  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({ type: [Todo] })
  @IsArray()
  todos: Todo[];
}
