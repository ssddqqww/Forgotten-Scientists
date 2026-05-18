import { NextResponse, type NextRequest } from "next/server";

import { deleteSession, isAuthStorageConfigurationError } from "../../../lib/auth-server";
import { clearSessionCookie, getSessionToken } from "../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await deleteSession(getSessionToken(request));
  } catch (error) {
    if (!isAuthStorageConfigurationError(error)) {
      console.error("Logout failed:", error);
    }
  }

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);

  return response;
}
