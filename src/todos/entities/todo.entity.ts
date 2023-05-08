import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class Todo {
  @ApiProperty({ default: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ default: 'buy movie ticket' })
  @IsString()
  title: string;

  @ApiProperty({ default: 'todo' })
  @IsEnum(Status)
  status: Status;

  //   @ApiProperty()
  @IsDateString()
  createdAt: Date;

  //   @ApiProperty()
  @IsDateString()
  updatedAt: Date;

  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  ownerId: number;
}
