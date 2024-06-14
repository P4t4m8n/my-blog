import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { decodeJWT } from "./server/middleware.server";
let headers = { "accept-language": "en-US,en;q=0.5" };
let languages = new Negotiator({ headers }).languages();
import { defaultLocale } from "./service/i18/constants";
import { i18n } from "./service/i18/i18n-config";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  let user = { user: { role: "" } };
  if (token)
    user = await decodeJWT(token.value, process.env.SECRET_KEY as string);

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

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const locale = match(languages, i18n.locales, defaultLocale);
  if (pathnameHasLocale) return res;
  // Redirect if there is no locale
  const returnUrl = req.nextUrl.clone();
  returnUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(returnUrl);
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
