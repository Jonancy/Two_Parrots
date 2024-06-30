/*
  Warnings:

  - You are about to drop the column `pixd` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "pixd",
ADD COLUMN     "pidx" TEXT;
