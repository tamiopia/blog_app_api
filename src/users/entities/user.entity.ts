import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { UserRole } from '../../shared/constants/roles';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
