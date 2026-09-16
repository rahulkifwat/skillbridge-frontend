import { NextResponse } from "next/server";
import { isSpanishBlockedPath, SPANISH_ACADEMY_HOME } from "./lib/spanishSplit";

function decodeJwtPayload(token) {
  try {
    const [, payload] = String(token || "").split(".");
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function middleware(request) {
  const token = request.cookies.get("sb_token")?.value;
  const payload = decodeJwtPayload(token);
  if (payload?.academy !== "spanish") return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (!isSpanishBlockedPath(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = SPANISH_ACADEMY_HOME;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
