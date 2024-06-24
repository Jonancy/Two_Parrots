/*
  Warnings:

  - You are about to drop the column `userId` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `email` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
