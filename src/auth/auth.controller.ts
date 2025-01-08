import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(user: any) {
    return this.authService.login(user);
  }

  @Post()
  validateUser(username: string, pass: string): Promise<any> {
    return this.authService.validateUser(username, pass);
  }
}
