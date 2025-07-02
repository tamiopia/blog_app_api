import {
  Controller,
  Post as HttpPost,
  Body,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
  Req,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostDto } from './dtos/create-post.dto';
import { CreatePostCommand } from './commands/create-post.command';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a blog post (auth required)' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Post data (title and content only)',
    type: CreatePostDto,
  })
  @UseGuards(AuthGuard('jwt')) // Auth only (no RolesGuard for now)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Save to the uploads directory
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() body: CreatePostDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File, // Interceptor will handle the file
  ) {
    try {
      const user = req.user as { userId: string; role: string };
      if (!user?.userId) {
        this.logger.warn('Unauthorized attempt to create post.');
        throw new UnauthorizedException('You must be logged in to create a post.');
      }

      if (!body.title || !body.content) {
        throw new BadRequestException('Post title and content are required.');
      }

      const image = file ? file.filename : null; // Handle file upload

      const command = new CreatePostCommand(
        body.title,
        body.content,
        image, // Attach the uploaded image filename
        user.userId,
      );

      const result = await this.commandBus.execute(command);
      return { message: 'Post created successfully', post: result };
    } catch (error) {
      this.logger.error('❌ Failed to create post:', error.stack || error);
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong while creating the post.');
    }
  }

  @Get('test-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Test JWT auth and return user info' })
  @ApiBearerAuth()
  testAuth(@Req() req: Request) {
    this.logger.log('✅ test-auth accessed by:', req.user);
    return {
      message: 'Authenticated!',
      user: req.user,
    };
  }
}
