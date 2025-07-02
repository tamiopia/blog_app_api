import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { GetPostWithCommentsQuery } from './get-post-with-comments.query';

@QueryHandler(GetPostWithCommentsQuery)
export class GetPostWithCommentsHandler implements IQueryHandler<GetPostWithCommentsQuery> {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async execute(query: GetPostWithCommentsQuery): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id: query.postId },
      relations: ['comments', 'comments.user'],
    });

    if (post) {
      post.comments.forEach(comment => {
        if (comment.user) {
          delete comment.user.password;
        }
      });
    }

    return post;
  }
}

