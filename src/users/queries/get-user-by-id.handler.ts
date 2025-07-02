import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

async execute(query: GetUserByIdQuery): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepo.findOne({ where: { id: query.userId } });
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
}
