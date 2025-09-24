import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/api/database/database.service';

@Module({
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
})
export class UsersModule {}
