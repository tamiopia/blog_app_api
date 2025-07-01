import { Controller, Post as HttpPost, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post.command';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private commandBus: CommandBus) {}

  @HttpPost()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user') // Allow both admin and editor roles to create posts
  
  async create(@Body() body: { title: string; content: string }) {
    return this.commandBus.execute(
      new CreatePostCommand(body.title, body.content)
    );
  }
}
