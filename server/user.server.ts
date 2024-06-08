"use server";

import { RoleType, UserDTO, UserModel } from "@/models/user.model";
import { prisma } from "@/prisma/prismaClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUsers = async (): Promise<UserModel[]> => {
  try {
    const users: UserDTO[] = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    const mappedUsers = users.map((user) => {
      delete user?.password;
      return {
        ...user,
        role: user.role as RoleType,
      };
    });
    return mappedUsers;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

export const getSessionUser = async (): Promise<UserModel | null> => {
  "use server";
  const token = cookies().get("token");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token.value) as { userId: string };
    if (!decoded || !decoded.userId) return null;
    const user = getUserById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw new Error(`Error fetching session user: ${err}`);
  }
};

export const getUserById = async (userId: string): Promise<UserModel> => {
  try {
    const user: UserDTO = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const mappedUser = {
      ...user,
      role: user.role as RoleType,
    };
    delete mappedUser?.password;
    return mappedUser;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};
