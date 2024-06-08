import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { decodeJWT } from "./server/middleware.server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const res = NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/login") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    returnUrl.searchParams.set("showDialog", "y");
    return NextResponse.redirect(returnUrl);
  }

  if (!token) {
    console.error("No token found");
    return res;
  }
  const user = await decodeJWT(token.value, process.env.SECRET_KEY as string);

 

  if (pathname === "/blog/edit" && user?.user?.role !== "admin") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    return NextResponse.redirect(returnUrl);
  }

  return res;
}
