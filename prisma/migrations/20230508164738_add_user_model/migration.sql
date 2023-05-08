-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "onwerId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_onwerId_fkey" FOREIGN KEY ("onwerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
