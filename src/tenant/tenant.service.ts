import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Tenant } from '@prisma/client';
import { generateApiKey, hashString, signJwt } from 'src/common/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateTenantDto,
  GetTenantsSchema,
  LoginTenantDto,
} from './dto/tenant.dto';
import { Role } from './dto/tenant.enum';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async createTenant(tenant: CreateTenantDto): Promise<{ tenant: Tenant }> {
    const data: Prisma.TenantCreateInput = { ...tenant };
    data.password = await hashString(data.password);

    let apiKey: string = await generateApiKey();

    let tenantExists = await this.getTenantByApiKey({ apiKey });

    while (tenantExists) {
      apiKey = await generateApiKey();
      tenantExists = await this.getTenantByApiKey({ apiKey });
    }

    data.apiKey = apiKey;

    const superAdminExists = await this.checkSuperAdminExists();
    if (tenant.role === Role.SUPER_ADMIN && superAdminExists) {
      throw new BadRequestException();
    }

    try {
      const newTenant = await this.prisma.tenant.create({ data });

      return { tenant: newTenant };
    } catch (err) {
      throw new BadRequestException(
        `User with email '${data.email}' already exists`,
      );
    }
  }

  async authorizeTenant(apiKey: string): Promise<{ token: string }> {
    const tenant = await this.getTenantByApiKey({ apiKey });

    if (!tenant) {
      throw new NotFoundException();
    }

    const token = await signJwt(3600, {
      id: tenant.id,
      role: tenant.role as Role,
    });

    return { token };
  }

  async getAllTenants(): Promise<GetTenantsSchema[]> {
    const tenants = await this.prisma.tenant.findMany({
      select: {
        email: true,
        id: true,
      },
    });

    return tenants;
  }

  async loginTenant(
    loginTenantData: LoginTenantDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        email: loginTenantData.email,
      },
    });

    if (!tenant) {
      throw new BadRequestException('User does not exist');
    }

    const accessToken = await signJwt(15 * 60, {
      id: tenant.id,
      role: tenant.role as Role,
    });
    const refreshToken = await signJwt(24 * 60 * 60, {
      id: tenant.id,
    });

    return { accessToken, refreshToken };
  }

  private async getTenantByApiKey(
    tenantWhereUniqueInput: Prisma.TenantWhereUniqueInput,
  ): Promise<Tenant> | null {
    const tenant: Tenant = await this.prisma.tenant.findUnique({
      where: tenantWhereUniqueInput,
    });

    if (tenant) {
      return tenant;
    }

    return null;
  }

  private async checkSuperAdminExists(): Promise<Tenant> {
    const superAdmin = await this.prisma.tenant.findFirst({
      where: { role: Role.SUPER_ADMIN },
    });

    return superAdmin;
  }
}
