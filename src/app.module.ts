import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { PostsModule } from './posts/posts.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommentsModule } from './comments/comments.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Or your MySQL password
      database: 'blog_db',
      entities: [User,Post,Comment],
      synchronize: true, // Dev only
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UsersModule,
    PostsModule,
    PassportModule,
    CommentsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET , 
      signOptions: { expiresIn: '1d' },
    }),
    CommentsModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
