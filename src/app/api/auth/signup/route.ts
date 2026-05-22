import { NextResponse, type NextRequest } from "next/server";

import {
  createUser,
  isAuthStorageConfigurationError,
  validateSignupInput,
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
    const ipLimit = await enforceRateLimit(
      request,
      "auth:signup:ip",
      getClientIdentifier(request),
      { maxAttempts: 20, windowSeconds: 60 * 60 }
    );

    if (ipLimit) {
      return ipLimit;
    }

    const validation = validateSignupInput(body);

    if (!validation.ok) {
      return jsonError(validation.message);
    }

    const emailLimit = await enforceRateLimit(
      request,
      "auth:signup:email",
      validation.email,
      { maxAttempts: 5, windowSeconds: 60 * 60 }
    );

    if (emailLimit) {
      return emailLimit;
    }

    const user = await createUser({
      fullName: validation.fullName,
      email: validation.email,
      password: validation.password,
    });

    if (!user) {
      return jsonError("An account with this email already exists.", 409);
    }

    const response = NextResponse.json({ user }, { status: 201 });
    await setSessionCookie(response, user.id);

    return noStore(response);
  } catch (error) {
    if (isAuthStorageConfigurationError(error)) {
      return jsonError("Authentication storage is not configured.", 500);
    }

    console.error("Signup failed:", error);
    return jsonError("Could not create account.", 500);
  }
}
