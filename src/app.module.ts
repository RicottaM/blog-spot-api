import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './api/database/database.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
