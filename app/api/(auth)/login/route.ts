import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { prisma } from "@/prisma/prismaClient";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const userData = await prisma.user.findFirstOrThrow({
      where: {
        email: {
          equals: email,
        },
      },
    });
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }
    const user = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      role: userData.role,
    };

    const token = jwt.sign({ user }, process.env.SECRET_KEY as string, {
      expiresIn: "72h",
    });
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 72,
      path: "/",
    });
    const response = NextResponse.json({ message: "Login successful", user });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
