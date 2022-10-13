import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AllowedRoles } from '../common/Auth/allowed_roles.decorator';
import { AuthGuard } from '../common/Auth/auth.guard';
import { Role } from '../tenant/dto/tenant.enum';
import { CreateSkillDto } from './dto/skill.dto';
import { SkillService } from './skill.service';

@Controller('api/v2/skills')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Post()
  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard)
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.createSkill(createSkillDto);
  }
}
