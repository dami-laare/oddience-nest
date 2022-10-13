-- CreateEnum
CREATE TYPE "SkillStatus" AS ENUM ('ACCEPTED', 'IN_REVIEW', 'DECLINED');

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "status" "SkillStatus" NOT NULL DEFAULT 'IN_REVIEW',
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);
