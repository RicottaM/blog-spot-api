import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInput, AuthResult, SignInData } from 'src/types/auth';
import { UsersService } from 'src/api/users/users.service';
import bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput) {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findByLogin(input.login);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.passwordHash,
      );

      if (isPasswordValid) {
        return {
          userId: user.id,
          login: user.login,
        };
      }
    }

    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.userId,
      login: user.login,
    });

    return { accessToken, login: user.login, userId: user.userId };
  }

  async register(input: RegisterDto): Promise<AuthResult> {
    await this.checkUserUnique(input.login, input.email);
    const passwordHash = await bcrypt.hash(
      input.password,
      Number(process.env.SALT_ROUNDS),
    );
    const user = await this.userService.create({ ...input, passwordHash });

    return this.signIn({ userId: user.id, login: user.login });
  }

  async checkUserUnique(login: string, email: string) {
    if (await this.userService.findByLogin(login)) {
      throw new ConflictException('Login already taken');
    }
    if (await this.userService.findByEmail(email)) {
      throw new ConflictException('Email already taken');
    }
  }
}
