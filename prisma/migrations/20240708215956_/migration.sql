/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userOrganization" DROP CONSTRAINT "userOrganization_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "userOrganization" DROP CONSTRAINT "userOrganization_userId_fkey";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "userOrganization";

-- CreateTable
CREATE TABLE "Organisation" (
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "userOrganisation" (
    "userId" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "userOrganisation_pkey" PRIMARY KEY ("userId","organisationId")
);

-- AddForeignKey
ALTER TABLE "userOrganisation" ADD CONSTRAINT "userOrganisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userOrganisation" ADD CONSTRAINT "userOrganisation_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
