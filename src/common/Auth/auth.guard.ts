import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { validateJwt } from '../common';
import { HEADERS } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      HEADERS.ALLOWED_ROLES,
      context.getHandler(),
    );
    if (allowedRoles[0] === '*') {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();

    const decoded = validateJwt(request, allowedRoles);

    if (decoded) {
      return true;
    }
    return false;
  }
}
