import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Skill } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateSkillDto } from './dto/skill.dto';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(SkillService.name);

  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill | void> {
    this.logger.log('Create new skill');
    try {
      createSkillDto.title = createSkillDto.title.toLowerCase();
      const skill = await this.prisma.skill.create({
        data: createSkillDto,
      });
      return skill;
    } catch (err: any) {
      this.logger.error(err, 'Create new skill');
      if (err.code === 'P2002') {
        throw new BadRequestException(
          `Skill with title /${createSkillDto.title}/ already exists`,
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
