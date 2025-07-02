import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { CreateCommentHandler } from './commands/create-comment.handler';
import { DeleteCommentHandler } from './commands/delete-comment.handler';
import { EditCommentHandler } from './commands/edit-comment.handler';


import { CommentsController } from './comments.controller';
import { CqrsModule } from '@nestjs/cqrs'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User]),
    CqrsModule, 
  ],
  controllers: [CommentsController],
  providers: [CreateCommentHandler,
    DeleteCommentHandler,
    EditCommentHandler,

  ],
})
export class CommentsModule {}