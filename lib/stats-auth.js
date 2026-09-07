import { createHash, timingSafeEqual } from "node:crypto";

export const STATS_COOKIE = "adithya_stats";

export function statsPasswordSet() {
  return Boolean(process.env.STATS_PASSWORD);
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyStatsPassword(password) {
  if (!statsPasswordSet()) return false;
  return safeEqual(hash(String(password ?? "")), hash(process.env.STATS_PASSWORD));
}

export function statsAuthed(cookieValue) {
  if (!statsPasswordSet()) return true;
  return Boolean(cookieValue) && safeEqual(hash(process.env.STATS_PASSWORD), cookieValue);
}

export function statsCookieValue() {
  return hash(process.env.STATS_PASSWORD ?? "");
}