import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostRepository } from '../repositories/post.repository';
import { Post } from '../entities/post.entity';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    const { title, content, image, userId } = command;

    const newPost = await this.postRepo.create({
      title,
      content,
      image,
      userId,
    });

    return newPost;
  }
}
