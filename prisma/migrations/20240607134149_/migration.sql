/*
  Warnings:

  - You are about to drop the column `accessableBy` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'PRIVATE';

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "accessableBy",
ADD COLUMN     "accessibleBy" "Role" NOT NULL DEFAULT 'PUBLIC';
