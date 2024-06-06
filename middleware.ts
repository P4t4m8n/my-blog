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
    console.log("No token found");
    return res;
    }
  const user = await decodeJWT(token.value, process.env.SECRET_KEY as string);
  const cookieData = JSON.stringify(user);

  res.cookies.set('user', cookieData, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return res;
}