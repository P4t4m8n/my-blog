/*
  Warnings:

  - Added the required column `bgColor` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "bgColor" TEXT NOT NULL;
