/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Men', 'Women');

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT DEFAULT 'https://res.cloudinary.com/dr1giexhn/image/upload/v1715435659/userProfile/pfp_ehyg3e.png',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User',
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Products" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "gender" "Gender" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "view" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Categories" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "ProductVariants" (
    "variantId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariants_pkey" PRIMARY KEY ("variantId")
);

-- CreateTable
CREATE TABLE "ProductSizes" (
    "sizeId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSizes_pkey" PRIMARY KEY ("sizeId")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "productImageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("productImageId")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSizes" ADD CONSTRAINT "ProductSizes_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("variantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("variantId") ON DELETE RESTRICT ON UPDATE CASCADE;
