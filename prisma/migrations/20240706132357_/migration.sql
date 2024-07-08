/*
  Warnings:

  - You are about to drop the column `membersId` on the `Organization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_membersId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "membersId";

-- CreateTable
CREATE TABLE "userOrganization" (
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "userOrganization_pkey" PRIMARY KEY ("userId","organizationId")
);

-- AddForeignKey
ALTER TABLE "userOrganization" ADD CONSTRAINT "userOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userOrganization" ADD CONSTRAINT "userOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
