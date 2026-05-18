import { NextResponse, type NextRequest } from "next/server";

import { isAuthStorageConfigurationError, verifyUserLogin } from "../../../lib/auth-server";
import { isRateLimited, jsonError, setSessionCookie } from "../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request, "login")) {
      return jsonError("Too many attempts. Please try again later.", 429);
    }

    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    const user = await verifyUserLogin(email, password);

    if (!user) {
      return jsonError("Email or password is incorrect.", 401);
    }

    const response = NextResponse.json({ user });
    await setSessionCookie(response, user.id);

    return response;
  } catch (error) {
    if (isAuthStorageConfigurationError(error)) {
      return jsonError("Authentication storage is not configured.", 500);
    }

    console.error("Login failed:", error);
    return jsonError("Could not log in.", 500);
  }
}
