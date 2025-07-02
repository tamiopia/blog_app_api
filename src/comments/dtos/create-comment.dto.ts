import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great post!' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'post-uuid-id' })
  @IsNotEmpty()
  postId: string;
}
