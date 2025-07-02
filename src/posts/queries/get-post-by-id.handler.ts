import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByIdQuery } from './get-post-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async execute(query: GetPostByIdQuery) {
    return this.postRepo.findOne({ where: { id: query.id } });
  }
}