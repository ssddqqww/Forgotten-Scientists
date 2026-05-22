import { NextResponse, type NextRequest } from "next/server";

import { deleteSession, isAuthStorageConfigurationError } from "../../../lib/auth-server";
import { clearSessionCookie, getSessionToken, noStore, rejectUntrustedOrigin } from "../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const originError = rejectUntrustedOrigin(request);

  if (originError) {
    return originError;
  }

  try {
    await deleteSession(getSessionToken(request));
  } catch (error) {
    if (!isAuthStorageConfigurationError(error)) {
      console.error("Logout failed:", error);
    }
  }

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);

  return noStore(response);
}
