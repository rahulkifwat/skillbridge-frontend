"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi, clearToken, getToken, setToken } from "@/lib/api";

const AuthContext = createContext(null);

const USER_KEY = "sb_user";

// Reads the cached user so a reload paints the right name before /me resolves.
function readCachedUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((nextUser) => {
    setUser(nextUser);
    if (typeof window === "undefined") return;
    if (nextUser) window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    else window.localStorage.removeItem(USER_KEY);
  }, []);

  // On mount: trust the cached user for the first paint, then confirm with the API.
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      if (!getToken()) {
        if (!cancelled) setLoading(false);
        return;
      }

      setUser(readCachedUser());

      try {
        const result = await authApi.me();
        if (!cancelled) persist(result.data.user);
      } catch {
        // Token expired or revoked — drop the stale session.
        if (!cancelled) {
          clearToken();
          persist(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, [persist]);

  const login = useCallback(
    async (email, password) => {
      const result = await authApi.login(email, password);
      setToken(result.data.token);
      persist(result.data.user);
      return result.data.user;
    },
    [persist]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Clearing locally matters more than the server round-trip succeeding.
    }
    clearToken();
    persist(null);
  }, [persist]);

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: Boolean(user) }),
    [user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an <AuthProvider>");
  return context;
}
