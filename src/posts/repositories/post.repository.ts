import { Post } from '../entities/post.entity';

export abstract class PostRepository {
  abstract create(post: Partial<Post>): Promise<Post>;
  abstract findById(id: string): Promise<Post | null>;
  abstract findAll(): Promise<Post[]>;
  abstract update(id: string, post: Partial<Post>): Promise<Post>;
  abstract delete(id: string): Promise<void>;
}
