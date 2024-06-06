import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const tokenCookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  const userCookie = serialize("user", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.set("Set-Cookie", tokenCookie);
  response.headers.append("Set-Cookie", userCookie);
  
  return response;
}
