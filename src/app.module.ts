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
import { ThrottlerModule } from '@nestjs/throttler';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
    // ThrottlerModule.forRoot({
    //   throttler: {
    //     ttl: 60,     // Time to live in seconds
    //     limit: 5,    // Max number of requests allowed per IP per TTL
    //   },
    // }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
