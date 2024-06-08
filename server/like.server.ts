'use server'

import { LikeModel } from "@/models/like.model";
import { prisma } from "@/prisma/prismaClient";

export const getLikesByUserId = async (
  userId: string
): Promise<LikeModel[]> => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: userId,
      },
    });
    return likes;
  } catch (error) {
    throw new Error(`Error in getLikesByUserId: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

// Add or remove a like from the database based on the input.
export const updateLike = async (
  likeId: string | null | undefined,
  blogId?: string,
  userId?: string
): Promise<LikeModel | null> => {
  if (likeId) return await _deleteLike(likeId);
  if (blogId && userId) return await _addLike(userId, blogId);
  throw new Error("Invalid input");
};

//**********private functions**********//

const _deleteLike = async (likeId: string): Promise<null> => {
  try {
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
    // Return null if the like is successfully deleted.
    return null;
  } catch (error) {
    throw new Error("Failed to delete like");
  } finally {
    await prisma.$disconnect();
  }
};
const _addLike = async (userId: string, blogId: string): Promise<LikeModel> => {
  try {
    return await prisma.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        blogPost: {
          connect: {
            id: blogId,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add like");
  } finally {
    await prisma.$disconnect();
  }
};
