import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/tenant/dto/tenant.enum';
import { HEADERS } from '../constants';

export const AllowedRoles = (...roles: (Role | '*')[]) =>
  SetMetadata(HEADERS.ALLOWED_ROLES, roles);
