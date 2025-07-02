import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class EditCommentDto {
  @ApiProperty({ example: 'Updated comment text' })
  @IsString()
  @MinLength(1)
  text: string;
}
