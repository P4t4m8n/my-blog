/*
  Warnings:

  - Added the required column `mainTag` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readTime` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "mainTag" TEXT NOT NULL,
ADD COLUMN     "readTime" INTEGER NOT NULL;
