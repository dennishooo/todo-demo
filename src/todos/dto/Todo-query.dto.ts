import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';

const ORDER = ['asc', 'desc'];
type Order = 'asc' | 'desc';
export class TodoQuery {
  @ApiProperty({
    default: 0,
  })
  @IsNumber()
  @Type(() => Number)
  skip: number;

  @ApiProperty({
    default: 10,
  })
  @Type(() => Number)
  @IsNumber()
  take: number;

  @ApiProperty({
    required: false,
    default: 'todo',
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({
    required: false,
    default: 'asc',
  })
  @IsIn(ORDER)
  @IsOptional()
  updatedAt?: Order;
}
