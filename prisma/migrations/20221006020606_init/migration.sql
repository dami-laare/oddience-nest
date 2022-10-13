-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "apiKey" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_email_key" ON "tenants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_apiKey_key" ON "tenants"("apiKey");
