
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: false })
  @JoinColumn({ name: 'userId' }) // makes sure `userId` is still stored in the DB
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}
