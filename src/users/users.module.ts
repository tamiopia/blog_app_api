import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserHandler } from './commands/register-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [UsersService, RegisterUserHandler],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
