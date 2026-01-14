import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { DefaultUserRoleOptions } from '../user-roles/user-roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (!request['user']) return false;

    return !!request['user']['user/roles']?.find(
      ({ name }) =>
        (name as DefaultUserRoleOptions) === DefaultUserRoleOptions.Admin,
    );
  }
}
