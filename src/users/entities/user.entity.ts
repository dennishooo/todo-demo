import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class User {
  @ApiProperty({ default: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ default: 'dennis' })
  @IsString()
  username: string;

  @ApiProperty({ default: 'HiLfx123!' })
  @IsEnum(Status)
  password: string;

  //   @ApiProperty()
  @IsDateString()
  createdAt: Date;

  //   @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
