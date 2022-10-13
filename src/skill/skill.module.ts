import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
})
export class SkillModule {}
