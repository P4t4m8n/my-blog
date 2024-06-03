import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const res = NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/login") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    console.log("returnUrl:", returnUrl)
    returnUrl.searchParams.set("showDialog", "y");

    return NextResponse.redirect(returnUrl);
  }

    return res;
 

}

