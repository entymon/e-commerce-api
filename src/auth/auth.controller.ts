import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client'; // Adjust the path as necessary
import { LocalAuthGuard } from './guards/local-auth.guard'; // Adjust the path as necessary
import { CurrentUser } from './current-user.decorator';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(user, response);
  }
}
