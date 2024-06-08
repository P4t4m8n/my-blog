import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prismaClient";
import { signupSchema } from "@/service/user.service";

export async function POST(request: Request) {
  const { firstName, lastName, username, email, password } =
    await request.json();
  try {
    const validateData = signupSchema.parse({
      firstName,
      lastName,
      email,
      password,
      username,
    });

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: username,
            },
          },
          {
            email: {
              equals: email,
            },
          },
        ],
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ...validateData,
        password: hashedPassword,
        role: "PUBLIC",
      },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
