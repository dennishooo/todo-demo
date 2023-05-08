import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

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

  @ApiPropertyOptional({
    required: false,
    default: 'todo',
  })
  @IsEnum(Status)
  status?: Status;
}
