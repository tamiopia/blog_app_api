import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString ,MinLength} from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;
}
