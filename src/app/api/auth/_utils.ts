import { NextResponse, type NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  consumeRateLimit,
  createSession,
  getUserBySessionToken,
} from "../../lib/auth-server";

type RateLimitOptions = {
  maxAttempts: number;
  windowSeconds: number;
};

export const jsonError = (message: string, status = 400) =>
  NextResponse.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );

export const noStore = <T extends NextResponse>(response: T) => {
  response.headers.set("Cache-Control", "no-store");
  return response;
};

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

const getForwardedOrigin = (request: NextRequest) => {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol =
    request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(/:$/, "");

  return host ? `${protocol}://${host}` : request.nextUrl.origin;
};

const getConfiguredOrigins = () =>
  [process.env.APP_ORIGIN, ...(process.env.ALLOWED_ORIGINS?.split(",") ?? [])]
    .map((origin) => origin?.trim())
    .filter((origin): origin is string => Boolean(origin));

export const rejectUntrustedOrigin = (request: NextRequest) => {
  if (request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") {
    return null;
  }

  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const trustedOrigins = new Set([
    request.nextUrl.origin,
    getForwardedOrigin(request),
    ...getConfiguredOrigins(),
  ]);

  if (origin && !trustedOrigins.has(origin)) {
    return jsonError("Invalid request origin.", 403);
  }

  if (!origin && fetchSite === "cross-site") {
    return jsonError("Invalid request origin.", 403);
  }

  return null;
};

export const getClientIdentifier = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "local";
};

export const enforceRateLimit = async (
  request: NextRequest,
  scope: string,
  subject: string,
  options: RateLimitOptions
) => {
  const result = await consumeRateLimit({
    scope,
    subject,
    maxAttempts: options.maxAttempts,
    windowSeconds: options.windowSeconds,
  });

  if (result.allowed) {
    return null;
  }

  const response = jsonError("Too many attempts. Please try again later.", 429);
  response.headers.set("Retry-After", String(result.retryAfterSeconds));
  return response;
};
