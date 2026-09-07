import { NextResponse } from "next/server";
import { STATS_COOKIE } from "../../../../lib/stats-auth";

export async function GET(request) {
  const response = NextResponse.redirect(new URL("/stats", request.url));
  response.cookies.set(STATS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}