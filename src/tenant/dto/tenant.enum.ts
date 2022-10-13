export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export interface JwtPayload {
  id: string | number;
  role?: Role;
}
