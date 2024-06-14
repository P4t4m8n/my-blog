import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { decodeJWT } from "./server/middleware.server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const res = NextResponse.next();

  const { pathname } = req.nextUrl;

  if (!token) {
    console.error("No token found");
    return res;
  }
  const user = await decodeJWT(token.value, process.env.SECRET_KEY as string);

  if (
    (pathname === "/blog/edit" ||
      pathname === "/profile/blog-posts" ||
      pathname === "/profile/users") &&
    user?.user?.role !== "admin"
  ) {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    return NextResponse.redirect(returnUrl);
  }

  return res;
}
