import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UsersService {
  createUser(data: CreateUserRequest) {
    return 'This action adds a new user';
  }
}
