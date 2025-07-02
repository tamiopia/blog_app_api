import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PostRepository } from './post.repository';

@Injectable()
export class TypeOrmPostRepository extends PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {
    super();
  }

  create(post: Partial<Post>): Promise<Post> {
    const newPost = this.repo.create(post);
    return this.repo.save(newPost);
  }

  findById(id: string): Promise<Post | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['comments', 'comments.user'],
    });
  }

  findAll(): Promise<Post[]> {
    return this.repo.find({
      relations: ['comments', 'comments.user'],
    });
  }

  update(id: string, post: Partial<Post>): Promise<Post> {
    return this.repo.save({ ...post, id });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
