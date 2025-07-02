import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';
import { CreateCommentCommand } from './create-comment.command';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(command: CreateCommentCommand): Promise<Comment> {
    const { text, postId, userId } = command;

    const post = await this.postRepo.findOne({ where: { id: postId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!post || !user) throw new Error('Post or user not found');

    const comment = this.commentRepo.create({ text, post, user });
    return await this.commentRepo.save(comment);
  }
}
