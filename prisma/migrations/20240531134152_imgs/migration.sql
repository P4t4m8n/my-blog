-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "imgs" TEXT[],
ALTER COLUMN "updatedAt" DROP NOT NULL;
