-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'description',
ALTER COLUMN "title" SET DEFAULT 'Untitled',
ALTER COLUMN "content" SET DEFAULT '',
ALTER COLUMN "published" SET DEFAULT false;
