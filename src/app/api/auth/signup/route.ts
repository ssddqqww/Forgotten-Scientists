import { NextResponse, type NextRequest } from "next/server";

import {
  createUser,
  isAuthStorageConfigurationError,
  validateSignupInput,
} from "../../../lib/auth-server";
import { isRateLimited, jsonError, setSessionCookie } from "../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request, "signup")) {
      return jsonError("Too many attempts. Please try again later.", 429);
    }

    const body = await request.json().catch(() => ({}));
    const validation = validateSignupInput(body);

    if (!validation.ok) {
      return jsonError(validation.message);
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

    return response;
  } catch (error) {
    if (isAuthStorageConfigurationError(error)) {
      return jsonError("Authentication storage is not configured.", 500);
    }

    console.error("Signup failed:", error);
    return jsonError("Could not create account.", 500);
  }
}
