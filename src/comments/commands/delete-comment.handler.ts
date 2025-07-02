import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { DeleteCommentCommand } from './delete-comment.command';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Post } from '../../posts/entities/post.entity';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand> {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}

  async execute(command: DeleteCommentCommand): Promise<string> {
    const comment = await this.commentRepo.findOne({
      where: { id: command.commentId },
      relations: ['user', 'post'],
    });

    if (!comment) throw new NotFoundException('Comment not found');

    const post = await this.postRepo.findOne({ where: { id: comment.post.id } });

    const isPostOwner = post?.userId === command.userId;
    const isCommentAuthor = comment.user.id === command.userId;

    if (!isPostOwner && !isCommentAuthor) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    await this.commentRepo.remove(comment);
    return 'Comment deleted successfully';
  }
}