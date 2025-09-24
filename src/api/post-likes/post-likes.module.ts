import { Module } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { PostLikesController } from './post-likes.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [PostLikesController],
  providers: [PostLikesService, DatabaseService],
})
export class PostLikesModule {}
