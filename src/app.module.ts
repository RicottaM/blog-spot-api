import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './api/database/database.module';
import { PostLikesModule } from './api/post-likes/post-likes.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, PostLikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
