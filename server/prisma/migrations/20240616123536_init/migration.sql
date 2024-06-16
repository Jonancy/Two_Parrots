/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Users` table. All the data in the column will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "phoneNumber",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT DEFAULT 'https://res.cloudinary.com/dr1giexhn/image/upload/v1715435659/userProfile/pfp_ehyg3e.png',
ALTER COLUMN "updatedAt" DROP DEFAULT;
