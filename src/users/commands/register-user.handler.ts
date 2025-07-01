import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../shared/constants/roles';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const hashedPassword = await bcrypt.hash(command.password, 10);

    const user = this.userRepo.create({
      username: command.username,
      email: command.email,
      password: hashedPassword,
      role: command.role,
    });

    return this.userRepo.save(user);
  }
}
