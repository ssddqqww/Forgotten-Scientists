import { NextResponse, type NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSession,
  getUserBySessionToken,
} from "../../lib/auth-server";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 20;

export const jsonError = (message: string, status = 400) =>
  NextResponse.json({ message }, { status });

export const getSessionToken = (request: NextRequest) =>
  request.cookies.get(SESSION_COOKIE)?.value;

export const getCurrentUserFromRequest = (request: NextRequest) =>
  getUserBySessionToken(getSessionToken(request));

export const setSessionCookie = async (response: NextResponse, userId: number) => {
  const session = await createSession(userId);

  response.cookies.set({
    name: SESSION_COOKIE,
    value: session.token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
};

export const clearSessionCookie = (response: NextResponse) => {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
};

export const isRateLimited = (request: NextRequest, scope: string) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "local";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_ATTEMPTS;
};
