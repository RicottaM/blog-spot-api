import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/api/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findByLogin(login: string) {
    return this.databaseService.user.findUnique({
      where: { login },
    });
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async create(input: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: {
        login: input.login,
        email: input.email,
        passwordHash: input.passwordHash,
      },
    });
  }
}
