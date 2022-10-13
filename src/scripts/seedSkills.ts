import { Test, TestingModule } from '@nestjs/testing';
import { SkillStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SkillController } from 'src/skill/skill.controller';
import { SkillService } from 'src/skill/skill.service';
import skills from './skills';

const seed = async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [SkillController],
    providers: [SkillService, PrismaService],
  }).compile();

  const skillController = app.get<SkillController>(SkillController);

  for (const skill of skills) {
    const skillCreated = await skillController.createSkill({
      title: skill,
      category: 'general',
      createdBy: 'hello@oddience.com',
      status: SkillStatus.ACCEPTED,
    });

    console.log(skillCreated);
  }
};

seed();
