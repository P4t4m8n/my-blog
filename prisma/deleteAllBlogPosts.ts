import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function deleteAllBlogPosts() {
  try {
    const result = await prisma.blogPost.deleteMany({});
    console.log("Deleted all blog posts:", result);
  } catch (error) {
    console.error("Error deleting blog posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllBlogPosts();
