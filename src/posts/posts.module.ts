import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './commands/create-post.handler';
import { GetPostWithCommentsHandler } from './queries/get-post-with-comments.handler';
import { UpdatePostHandler } from './commands/update-post.handler';
import { DeletePostHandler } from './commands/delete-post.handler';
import { GetPostByIdHandler } from './queries/get-post-by-id.handler';
import { GetPostsHandler } from './queries/get-posts.handler';
import { PostRepository } from './repositories/post.repository';
import { TypeOrmPostRepository } from './repositories/typeorm-post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CqrsModule],
  controllers: [PostsController],
  providers: [CreatePostHandler,
    GetPostWithCommentsHandler,
    UpdatePostHandler,
    DeletePostHandler,
    GetPostByIdHandler,
    GetPostsHandler,
    {
      provide: PostRepository,
      useClass: TypeOrmPostRepository,
    },
  ],
})
export class PostsModule {}
