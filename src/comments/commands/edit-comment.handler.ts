import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { EditCommentCommand } from './edit-comment.command';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(EditCommentCommand)
export class EditCommentHandler implements ICommandHandler<EditCommentCommand> {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async execute(command: EditCommentCommand): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id: command.commentId },
      relations: ['user'],
    });

    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user.id !== command.userId) throw new ForbiddenException('You cannot edit this comment');

    comment.text = command.newText;
    return this.commentRepo.save(comment);
  }
}