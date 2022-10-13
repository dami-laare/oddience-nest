-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'USER');

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
