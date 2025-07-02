import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Logger,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiBody,
  } from '@nestjs/swagger';
  import { AuthGuard } from '@nestjs/passport';
  import { Request } from 'express';
  import { CommandBus } from '@nestjs/cqrs';
  import { CreateCommentDto } from './dtos/create-comment.dto';
  import { CreateCommentCommand } from './commands/create-comment.command';
  
  @ApiTags('Comments')
  @Controller('comments')
  export class CommentsController {
    private readonly logger = new Logger(CommentsController.name);
  
    constructor(private readonly commandBus: CommandBus) {}
  
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a comment on a post (auth required)' })
    @ApiBody({ type: CreateCommentDto })
    async createComment(
      @Body() dto: CreateCommentDto,
      @Req() req: Request,
    ) {
      const user = req.user as { userId: string };
  
      this.logger.log(`Creating comment by user ${user.userId} on post ${dto.postId}`);
  
      const command = new CreateCommentCommand(dto.text, dto.postId, user.userId);
      const comment = await this.commandBus.execute(command);
  
      return { message: 'Comment created successfully', comment };
    }
  }
  