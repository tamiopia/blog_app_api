import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany  } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity'; 

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

  @Column()
  userId: string;

  

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}
