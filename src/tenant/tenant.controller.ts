import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AllowedRoles } from 'src/common/Auth/allowed_roles.decorator';
import { AuthGuard } from 'src/common/Auth/auth.guard';
import { CreateTenantDto, LoginTenantDto } from './dto/tenant.dto';
import { Role } from './dto/tenant.enum';
import { TenantService } from './tenant.service';

@Controller('api/v2/tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  createTenant(@Body() tenant: CreateTenantDto) {
    return this.tenantService.createTenant(tenant);
  }

  @Get('authorize/:apiKey')
  authorizeTenant(@Param('apiKey') apiKey: string) {
    return this.tenantService.authorizeTenant(apiKey);
  }

  @Get()
  @UseGuards(AuthGuard)
  @AllowedRoles(Role.SUPER_ADMIN)
  getAllTenants() {
    return this.tenantService.getAllTenants();
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() loginTenantData: LoginTenantDto) {
    return this.tenantService.loginTenant(loginTenantData);
  }
}
