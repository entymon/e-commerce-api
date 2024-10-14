import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import ms from 'ms';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, 
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() + ms(this.configService.getOrThrow<string>('JWT_EXPIRES_IN')),
    )

    const TokenPayload: TokenPayload = {
      userId: user.id,
    }
    const token = this.jwtService.sign(TokenPayload);

    // this.configService.getOrThrow('NODE_ENV') === 'production',
    response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.getUser({ email });
      const authenitcated = await bcrypt.compare(password, user.password);
      if (!authenitcated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
