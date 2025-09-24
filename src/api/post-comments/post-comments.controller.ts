import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostComment, Prisma } from '@prisma/client';

@Controller('post-comments')
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @Post()
  async create(
    @Body() createPostCommentDto: Prisma.PostCommentCreateInput,
  ): Promise<PostComment> {
    return await this.postCommentsService.create(createPostCommentDto);
  }

  @Get()
  async findAll(): Promise<PostComment[]> {
    return this.postCommentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostComment | null> {
    return await this.postCommentsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostComment> {
    return await this.postCommentsService.remove(+id);
  }
}
