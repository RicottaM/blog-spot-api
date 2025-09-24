import { Injectable } from '@nestjs/common';
import { PostComment, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostCommentsService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    createPostCommentDto: Prisma.PostCommentCreateInput,
  ): Promise<PostComment> {
    return await this.databaseService.postComment.create({
      data: createPostCommentDto,
    });
  }

  async findAll(): Promise<PostComment[]> {
    return await this.databaseService.postComment.findMany();
  }

  async findOne(id: number): Promise<PostComment | null> {
    return await this.databaseService.postComment.findUnique({
      where: { id },
    });
  }

  async remove(id: number): Promise<PostComment> {
    return await this.databaseService.postComment.delete({
      where: { id },
    });
  }
}
