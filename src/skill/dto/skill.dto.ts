import { SkillStatus } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  title: string;

  @IsEmail()
  createdBy: string;

  status?: SkillStatus;

  @IsNotEmpty()
  category: string;
}
