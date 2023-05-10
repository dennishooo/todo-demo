import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserWithoutPassword } from './entities/user.entity';

@Injectable()
export class UsersService {
  private SALT_ROUND: number;
  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.SALT_ROUND = this.config.get<number>('SALT_ROUND');
  }

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, this.SALT_ROUND);
    return this.prisma.user.create({
      data: { username: createUserDto.username, password },
    });
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        todos: true,
      },
    });
  }

  async findOne(username: string): Promise<User> {
    let foundUser = await this.prisma.user.findUnique({
      where: { username },
      include: {
        todos: true,
      },
    });
    if (!foundUser) throw new NotFoundException('No user found');
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        this.SALT_ROUND,
      );
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: number): Promise<User | undefined> {
    return this.prisma.user.delete({ where: { id } });
  }
}
