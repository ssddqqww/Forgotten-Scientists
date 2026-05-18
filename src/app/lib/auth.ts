"use client";

import type { StoredUser } from "./auth-types";

export type { StoredUser };

type AuthSuccess = {
  ok: true;
  user: StoredUser;
};

type AuthFailure = {
  ok: false;
  message: string;
};

export type AuthResult = AuthSuccess | AuthFailure;

export const AUTH_CHANGE_EVENT = "forgotten-scientists-auth-change";

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const parseAuthResponse = async (response: Response): Promise<AuthResult> => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false,
      message: typeof payload.message === "string" ? payload.message : "Authentication failed.",
    };
  }

  return { ok: true, user: payload.user };
};

export const getCurrentUser = async (): Promise<StoredUser | null> => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    cache: "no-store",
    credentials: "same-origin",
  });

  if (!response.ok) return null;

  const payload = await response.json().catch(() => ({}));
  return payload.user ?? null;
};

export const registerUser = async (user: {
  fullName: string;
  email: string;
  password: string;
}): Promise<AuthResult> => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(user),
  });
  const result = await parseAuthResponse(response);

  if (result.ok) {
    emitAuthChange();
  }

  return result;
};

export const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });
  const result = await parseAuthResponse(response);

  if (result.ok) {
    emitAuthChange();
  }

  return result;
};

export const logoutUser = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "same-origin",
  });
  emitAuthChange();
};

export const updateCurrentUser = async (
  updates: Partial<Omit<StoredUser, "id" | "email" | "createdAt">>
): Promise<AuthResult> => {
  const response = await fetch("/api/auth/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(updates),
  });
  const result = await parseAuthResponse(response);

  if (result.ok) {
    emitAuthChange();
  }

  return result;
};
