/*
  Warnings:

  - Added the required column `a` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "a" TEXT NOT NULL;
