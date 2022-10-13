import { Test, TestingModule } from '@nestjs/testing';
import { SkillStatus } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

describe('AppController', () => {
  let skillController: SkillController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [SkillService, PrismaService],
    }).compile();

    skillController = app.get<SkillController>(SkillController);
  });

  describe('testing the skill controllers', () => {
    // it('should return a new skill object', async () => {
    //   const skill = await skillController.createSkill({
    //     title: 'Advice on funding',
    //     createdBy: 'hello@oddience.co',
    //     category: 'general',
    //     status: SkillStatus.ACCEPTED,
    //   });
    //   expect(skill).toEqual(
    //     expect.objectContaining({
    //       title: expect.any(String),
    //       id: expect.any(Number),
    //       createdAt: expect.any(Date),
    //     }),
    //   );
    // });

    it('should throw an error when creating a skill which already exists', () => {
      expect(
        skillController.createSkill({
          title: 'Advice on funding',
          createdBy: 'hello@oddience.co',
          category: 'general',
          status: SkillStatus.ACCEPTED,
        }),
      ).rejects.toEqual(
        expect.objectContaining({
          statusCode: expect(400),
        }),
      );
    });

    it('should throw an error when creating a skill without being authorized as a super admin', () => {
      expect(
        skillController.createSkill({
          title: 'Advice on funding',
          createdBy: 'hello@oddience.co',
          category: 'general',
          status: SkillStatus.ACCEPTED,
        }),
      ).rejects.toEqual(
        expect.objectContaining({
          statusCode: expect(401),
        }),
      );
    });
  });
});
