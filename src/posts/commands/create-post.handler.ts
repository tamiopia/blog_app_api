import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostCommand } from './create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    const post = this.postRepo.create({
      title: command.title,
      content: command.content,
      image: command.image,
      userId: command.userId,
    });

    return this.postRepo.save(post);
  }
}
