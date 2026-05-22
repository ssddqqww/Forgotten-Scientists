import { NextResponse, type NextRequest } from "next/server";

import {
  isAuthStorageConfigurationError,
  normalizeEmail,
  verifyUserLogin,
} from "../../../lib/auth-server";
import {
  enforceRateLimit,
  getClientIdentifier,
  jsonError,
  noStore,
  rejectUntrustedOrigin,
  setSessionCookie,
} from "../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const originError = rejectUntrustedOrigin(request);

    if (originError) {
      return originError;
    }

    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    const normalizedEmail = normalizeEmail(email);
    const ipLimit = await enforceRateLimit(
      request,
      "auth:login:ip",
      getClientIdentifier(request),
      { maxAttempts: 40, windowSeconds: 10 * 60 }
    );

    if (ipLimit) {
      return ipLimit;
    }

    const emailLimit = await enforceRateLimit(
      request,
      "auth:login:email",
      normalizedEmail || "empty-email",
      { maxAttempts: 10, windowSeconds: 10 * 60 }
    );

    if (emailLimit) {
      return emailLimit;
    }

    const user = await verifyUserLogin(email, password);

    if (!user) {
      return jsonError("Email or password is incorrect.", 401);
    }

    const response = NextResponse.json({ user });
    await setSessionCookie(response, user.id);

    return noStore(response);
  } catch (error) {
    if (isAuthStorageConfigurationError(error)) {
      return jsonError("Authentication storage is not configured.", 500);
    }

    console.error("Login failed:", error);
    return jsonError("Could not log in.", 500);
  }
}
