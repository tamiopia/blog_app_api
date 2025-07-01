import { UserRole } from '../../shared/constants/roles';

export class RegisterUserCommand {
    constructor(
      public readonly username: string,
      public readonly email: string,
      public readonly password: string,
      public readonly role: UserRole
    ) {}
  }
  