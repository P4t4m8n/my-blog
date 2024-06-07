import { CommentModel } from "@/models/comment.model";
import { prisma } from "@/prisma/prismaClient";

export const getCommentsByUserId = async (
  userId: string
): Promise<CommentModel[]> => {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        userId: userId,
      },
    });
    return comments;
  } catch (error) {
    throw new Error(`Error in getCommentsByUserId: ${error}`);
  } 
  finally {
    await prisma.$disconnect();
  }
};
