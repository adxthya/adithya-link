import { NextResponse } from "next/server";
import {
  STATS_COOKIE,
  statsPasswordSet,
  statsCookieValue,
  verifyStatsPassword,
} from "../../../../lib/stats-auth";

export async function POST(request) {
  if (!statsPasswordSet()) {
    return NextResponse.json(
      { ok: false, error: "no password configured" },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  if (!verifyStatsPassword(body?.password)) {
    return NextResponse.json({ ok: false, error: "wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STATS_COOKIE, statsCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}