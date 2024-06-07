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
