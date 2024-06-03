import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signupSchema } from "@/server/user.server";
import { prisma } from "@/prisma/prismaClient";

const users: { username: string; password: string }[] = [];

export async function POST(request: Request) {
  const { firstName, lastName, username, email, password } =
    await request.json();

    const validateData = signupSchema.parse({ firstName, lastName, email, password, username })



  // Check if user already exists
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
  })
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // // Store the user
  // users.push({ username, password: hashedPassword });

  // return NextResponse.json({ message: 'User registered successfully' });
}
