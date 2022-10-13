import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { Role } from './tenant.enum';

export class CreateTenantDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Your password must be at least 8 characters' })
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Your password is too weak. It must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  role: Role;
}

export class LoginTenantDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}

export interface GetTenantsSchema {
  email: string;
  id: string | number;
}
