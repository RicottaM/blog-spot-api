import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { Prisma } from '@prisma/client';

@Controller('post-likes')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @Post()
  async create(@Body() createPostLikeDto: Prisma.PostLikeCreateInput) {
    return await this.postLikesService.create(createPostLikeDto);
  }

  @Get()
  async findAll() {
    return await this.postLikesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postLikesService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postLikesService.remove(+id);
  }
}
