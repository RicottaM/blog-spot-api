import { Injectable } from '@nestjs/common';
import { PostLike, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostLikesService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    createPostLikeDto: Prisma.PostLikeCreateInput,
  ): Promise<PostLike> {
    return await this.databaseService.postLike.create({
      data: createPostLikeDto,
    });
  }

  async findAll(): Promise<PostLike[]> {
    return await this.databaseService.postLike.findMany();
  }

  async findOne(id: number): Promise<PostLike | null> {
    return await this.databaseService.postLike.findUnique({
      where: { id },
    });
  }

  async remove(id: number): Promise<PostLike> {
    return await this.databaseService.postLike.delete({
      where: { id },
    });
  }
}
