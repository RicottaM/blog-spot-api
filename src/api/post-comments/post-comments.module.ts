import { Module } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [PostCommentsController],
  providers: [PostCommentsService, DatabaseService],
})
export class PostCommentsModule {}
