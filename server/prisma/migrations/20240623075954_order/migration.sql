/*
  Warnings:

  - Added the required column `location` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
