import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUserCommand } from './commands/register-user.command';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { User } from './entities/user.entity';
import { UserRole } from '../shared/constants/roles';

import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus // ✅ Injected
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  async register(@Body() dto: RegisterUserDto) {
    return this.commandBus.execute(
      new RegisterUserCommand(dto.username, dto.email, dto.password, UserRole.USER)
    );
  }

  @Post('register-admin')
  @ApiOperation({ summary: 'Register an admin user' })
  @ApiBody({ type: RegisterUserDto })
  async registerAdmin(@Body() dto: RegisterUserDto) {
    return this.commandBus.execute(
      new RegisterUserCommand(dto.username, dto.email, dto.password, UserRole.ADMIN)
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.queryBus.execute(new GetUserByIdQuery(id));
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
