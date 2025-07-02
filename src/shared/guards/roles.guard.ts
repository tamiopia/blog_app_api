import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      console.warn('[RolesGuard] No user found in request. Did you forget AuthGuard?');
      throw new ForbiddenException('User not authenticated');
    }

    if (!user.role) {
      console.warn('[RolesGuard] User found, but has no role');
      throw new ForbiddenException('User role is missing');
    }

    const isAllowed = requiredRoles.includes(user.role);

    if (!isAllowed) {
      console.warn(`[RolesGuard] Access denied. Required roles: ${requiredRoles}. Found: ${user.role}`);
    }

    return isAllowed;
  }
}
