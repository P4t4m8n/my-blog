import {
  RoleType,
  UserDTO,
  UserModel,
  UserSmallModel,
} from "@/models/user.model";
import { prisma } from "@/prisma/prismaClient";
import { z } from "zod";

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

export const getUserById = async (userId: string): Promise<UserModel> => {
  try {
    const user:UserDTO = await prisma.user.findUniqueOrThrow({
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

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(4, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
