-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Khalti', 'Esewa');

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "paymentMethod" "PaymentMethod";
