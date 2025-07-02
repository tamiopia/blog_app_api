import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UpdatePostCommand } from './update-post.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async execute(command: UpdatePostCommand) {
    const post = await this.postRepo.findOne({ where: { id: command.postId } });
    if (!post) throw new NotFoundException('Post not found');

    if (command.title) post.title = command.title;
    if (command.content) post.content = command.content;

    return this.postRepo.save(post);
  }
}
