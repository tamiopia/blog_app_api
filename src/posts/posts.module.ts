import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './commands/create-post.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CqrsModule],
  controllers: [PostsController],
  providers: [CreatePostHandler],
})
export class PostsModule {}
