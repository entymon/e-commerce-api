import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserRequest): Promise<Pick<User, 'email' | 'id' | 'name'>> {
    try {
      return await this.prismaService.user.create({ 
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          email: true,
          id: true,
          name: true,
          password: false,
        } 
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException('User with this email already exists');
      }
      throw error
    }
  }
}
