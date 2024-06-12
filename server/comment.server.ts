import { CommentModel } from "@/models/comment.model";
import { prisma } from "@/prisma/prismaClient";

export const getCommentsByUserId = async (
  userId: string
): Promise<CommentModel[]> => {
  try {
    const commentsDTO = await prisma.comments.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const comments = commentsDTO.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        username: comment.user.username,
        userId: comment.userId,
        updatedAt: comment.updatedAt || null,
        blogPostId: comment.blogPostId,
      };
    });
    return comments;
  } catch (error) {
    throw new Error(`Error in getCommentsByUserId: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
