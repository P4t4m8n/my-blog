"use server";

import { LikeDTO, LikeModel, LikeSmallModel } from "@/models/like.model";
import { prisma } from "@/prisma/prismaClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getLikesBySession = async (): Promise<LikeModel[] | null> => {
  const token = cookies().get("token");
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.decode(token.value) as { userId: string };
    if (!decoded || !decoded.userId) return null;
    const likesData = await _getLikesByUserId(decoded.userId);

    const likes = likesData.map((like) => {
      const { id, blogPost, userId, createdAt, blogPostId } = like;
      return {
        
        id,
        blogPostId,
        userId,
        createdAt,
        title: blogPost.title,
       
      };
    });

    if (!likes) {
      throw new Error("User not found");
    }

    return likes;
  } catch (err) {
    throw new Error(`Error fetching session user: ${err}`);
  }
};

// Add or remove a like from the database based on the input.
export const updateLike = async (
  likeId: string | null | undefined,
  blogId?: string,
  userId?: string
): Promise<LikeSmallModel | null> => {
  if (likeId) return await _deleteLike(likeId);
  if (blogId && userId) return await _addLike(userId, blogId);
  throw new Error("Invalid input");
};

//**********private functions**********//

const _getLikesByUserId = async (userId: string): Promise<LikeDTO[]> => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: userId,
      },
      include: {
        blogPost: {
          select: {
            title: true,
            imgs: true,
          },
        },
      },
    });
    return likes;
  } catch (error) {
    throw new Error(`Error in getLikesByUserId: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

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
const _addLike = async (
  userId: string,
  blogId: string
): Promise<LikeSmallModel> => {
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
