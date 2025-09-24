import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthInput } from 'src/types/auth';
import { AuthGuard } from './guards/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { cookiesConfig } from 'src/config/cookies';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() input: AuthInput,
    @Response() response,
  ): Promise<{
    userId: number;
    login: string;
  }> {
    const { accessToken, userId, login } =
      await this.authService.authenticate(input);

    response.cookie('accessToken', accessToken, cookiesConfig);

    return { userId, login };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }

  @Post()
  async register(@Body() input: RegisterDto, @Response() response) {
    const { accessToken, userId, login } =
      await this.authService.register(input);

    response.cookie('accessToken', accessToken, cookiesConfig);

    return { userId, login };
  }
}
