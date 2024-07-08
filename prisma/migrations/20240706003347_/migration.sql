/*
  Warnings:

  - Added the required column `membersId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Organization_orgId_key";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "membersId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("orgId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
