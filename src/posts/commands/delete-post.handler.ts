import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { DeletePostCommand } from './delete-post.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async execute(command: DeletePostCommand) {
    const post = await this.postRepo.findOne({ where: { id: command.postId } });
    if (!post) throw new NotFoundException('Post not found');

    await this.postRepo.remove(post);
    return { message: 'Post deleted successfully' };
  }
}
