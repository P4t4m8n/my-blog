/*
  Warnings:

  - You are about to drop the column `rating` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `content` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "rating",
ADD COLUMN     "content" TEXT NOT NULL;
