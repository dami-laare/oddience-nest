import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowedRoles } from './common/Auth/allowed_roles.decorator';
import { AuthGuard } from './common/Auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowedRoles('*')
  @UseGuards(AuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
