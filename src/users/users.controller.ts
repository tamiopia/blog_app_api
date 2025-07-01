import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUserCommand } from './commands/register-user.command';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserRole } from '../shared/constants/roles'; // ✅ IMPORT THIS

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus) {}

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
}
