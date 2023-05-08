/*
  Warnings:

  - You are about to drop the column `onwerId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_onwerId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "onwerId",
ADD COLUMN     "ownerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
