export type StoredUser = {
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  username?: string;
  pronouns?: string;
  phone?: string;
  bio?: string;
  favoriteField?: string;
  preferredSection?: string;
};

const USERS_KEY = "forgotten-scientists-users";
const CURRENT_USER_KEY = "forgotten-scientists-current-user";
export const AUTH_CHANGE_EVENT = "forgotten-scientists-auth-change";

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const makeUsername = (fullName: string, email: string) => {
  const base =
    fullName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/^\.+|\.+$/g, "") || email.split("@")[0];

  return base.slice(0, 24);
};

export const getUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];

  try {
    const users = window.localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

export const getCurrentUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const user = window.localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const registerUser = (user: Omit<StoredUser, "createdAt">) => {
  const users = getUsers();
  const normalizedEmail = user.email.trim().toLowerCase();
  const existingUser = users.find((savedUser) => savedUser.email === normalizedEmail);

  if (existingUser) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const nextUser: StoredUser = {
    fullName: user.fullName.trim(),
    email: normalizedEmail,
    password: user.password,
    createdAt: new Date().toISOString(),
    username: makeUsername(user.fullName, normalizedEmail),
  };

  window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]));
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));
  emitAuthChange();

  return { ok: true, user: nextUser };
};

export const loginUser = (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find(
    (savedUser) => savedUser.email === normalizedEmail && savedUser.password === password
  );

  if (!user) {
    return { ok: false, message: "Email or password is incorrect." };
  }

  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  emitAuthChange();

  return { ok: true, user };
};

export const logoutUser = () => {
  window.localStorage.removeItem(CURRENT_USER_KEY);
  emitAuthChange();
};

export const updateCurrentUser = (updates: Partial<Omit<StoredUser, "email" | "createdAt" | "password">>) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return { ok: false, message: "No active user found." };
  }

  const nextUser: StoredUser = {
    ...currentUser,
    ...updates,
    fullName: updates.fullName?.trim() || currentUser.fullName,
  };

  const users = getUsers().map((savedUser) =>
    savedUser.email === currentUser.email ? nextUser : savedUser
  );

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));
  emitAuthChange();

  return { ok: true, user: nextUser };
};
