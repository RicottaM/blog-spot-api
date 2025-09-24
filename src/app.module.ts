import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './api/database/database.module';
import { PostsModule } from './posts/posts.module';
import { PostsModule } from './api/posts/posts.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
