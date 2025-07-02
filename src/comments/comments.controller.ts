import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Logger,
    Patch, 
    Delete,
    Param,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiBody,
    ApiParam 
  } from '@nestjs/swagger';
  import { AuthGuard } from '@nestjs/passport';
  import { Request } from 'express';
  import { CommandBus } from '@nestjs/cqrs';
  import { CreateCommentDto } from './dtos/create-comment.dto';
  import { CreateCommentCommand } from './commands/create-comment.command';
  import { EditCommentDto } from './dtos/edit-comment.dto';
import { EditCommentCommand } from './commands/edit-comment.command';
import { DeleteCommentCommand } from './commands/delete-comment.command';
  
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

    @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Edit your comment' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  async editComment(
    @Param('id') id: string,
    @Body() dto: EditCommentDto,
    @Req() req,
  ) {
    return this.commandBus.execute(
      new EditCommentCommand(id, req.user.userId, dto.text),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete your comment or as post owner' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  async deleteComment(@Param('id') id: string, @Req() req) {
    return this.commandBus.execute(
      new DeleteCommentCommand(id, req.user.userId),
    );
  }
  }
  