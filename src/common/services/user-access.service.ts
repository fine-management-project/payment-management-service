import { Injectable } from '@nestjs/common';
import { Fine as FineEntity } from 'src/modules/fine/domain/entities/fine.entity';
import { DefaultUserRoleOptions } from '../user-roles/user-roles.enum';
import { Role } from '../types/role';
import { UserId } from '../value-objects/user-id.vo';

@Injectable()
export class UserAccessService {
  canUserProcessFine(
    fine: FineEntity,
    userId: UserId,
    userRoles: Role[],
  ): boolean {
    return (
      fine.userId.isEqual(userId) ||
      !!userRoles.find(({ name }) => name === DefaultUserRoleOptions.Admin)
    );
  }
}
