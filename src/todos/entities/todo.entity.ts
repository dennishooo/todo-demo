import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class Todo {
  @ApiProperty()
  @IsNumber()
  id: number;
}
