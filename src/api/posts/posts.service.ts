import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private databaseService: DatabaseService) {}

  async create(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    return await this.databaseService.post.create({
      data: createPostDto,
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.databaseService.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return await this.databaseService.post.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePostDto: Prisma.PostUpdateInput,
  ): Promise<Post> {
    return await this.databaseService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number): Promise<Post> {
    return await this.databaseService.post.delete({
      where: { id },
    });
  }
}
