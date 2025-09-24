import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/api/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findByLogin(login: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { login },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async create(input: Prisma.UserCreateInput): Promise<User> {
    return this.databaseService.user.create({
      data: {
        login: input.login,
        email: input.email,
        passwordHash: input.passwordHash,
      },
    });
  }
}
