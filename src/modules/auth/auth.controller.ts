import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginPostDTO } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginPostDTO) {
    try {
      const existUser = await this.authService.login(user);
      if (!existUser) return 'not found';

      const token = await this.authService.signTokenVerify(user);

      return { ...existUser, token };
    } catch (error) {
      return 'error';
    }
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testApi() {
    return 'ok';
  }
}
