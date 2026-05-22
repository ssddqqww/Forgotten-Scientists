import { NextResponse, type NextRequest } from "next/server";

import { isAuthStorageConfigurationError, updateUserProfile } from "../../../lib/auth-server";
import {
  enforceRateLimit,
  getCurrentUserFromRequest,
  jsonError,
  noStore,
  rejectUntrustedOrigin,
} from "../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(request);

    if (!user) {
      return jsonError("Not authenticated.", 401);
    }

    return noStore(NextResponse.json({ user }));
  } catch (error) {
    if (isAuthStorageConfigurationError(error)) {
      return jsonError("Authentication storage is not configured.", 500);
    }

    console.error("Session lookup failed:", error);
    return jsonError("Could not load account.", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const originError = rejectUntrustedOrigin(request);

    if (originError) {
      return originError;
    }

    const user = await getCurrentUserFromRequest(request);

    if (!user) {
      return jsonError("Not authenticated.", 401);
    }

    const rateLimit = await enforceRateLimit(
      request,
      "auth:profile:update",
      `user:${user.id}`,
      { maxAttempts: 30, windowSeconds: 10 * 60 }
    );

    if (rateLimit) {
      return rateLimit;
    }

    const body = await request.json().catch(() => ({}));
    const updatedUser = await updateUserProfile(user.id, {
      fullName: typeof body.fullName === "string" ? body.fullName : undefined,
      username: typeof body.username === "string" ? body.username : undefined,
      pronouns: typeof body.pronouns === "string" ? body.pronouns : undefined,
      phone: typeof body.phone === "string" ? body.phone : undefined,
      bio: typeof body.bio === "string" ? body.bio : undefined,
      favoriteField: typeof body.favoriteField === "string" ? body.favoriteField : undefined,
      preferredSection: typeof body.preferredSection === "string" ? body.preferredSection : undefined,
    });

    if (!updatedUser) {
      return jsonError("Could not update profile.");
    }

    return noStore(NextResponse.json({ user: updatedUser }));
  } catch (error) {
    if (isAuthStorageConfigurationError(error)) {
      return jsonError("Authentication storage is not configured.", 500);
    }

    console.error("Profile update failed:", error);
    return jsonError("Could not update profile.", 500);
  }
}
