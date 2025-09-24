import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './api/database/database.module';
import { PostLikesModule } from './api/post-likes/post-likes.module';
import { PostCommentsModule } from './api/post-comments/post-comments.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, PostLikesModule, PostCommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
