const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const TOKEN_KEY = "sb_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

// Thrown for any non-2xx response. `errors` is the { field: message } map the
// backend returns for validation failures.
export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors || null;
  }
}

export async function apiRequest(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Make sure the API is running on " + API_URL,
      { status: 0 }
    );
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Non-JSON response (proxy error page, etc.) — fall through to the status check.
  }

  if (!response.ok) {
    throw new ApiError(payload?.message || `Request failed (${response.status})`, {
      status: response.status,
      errors: payload?.errors,
    });
  }

  return payload;
}

export const authApi = {
  login: (email, password) =>
    apiRequest("/auth/login", { method: "POST", body: { email, password }, auth: false }),
  register: (payload) =>
    apiRequest("/auth/register", { method: "POST", body: payload, auth: false }),
  me: () => apiRequest("/auth/me"),
  logout: () => apiRequest("/auth/logout", { method: "POST" }),
};

export const contactApi = {
  submit: (payload) =>
    apiRequest("/contact", { method: "POST", body: payload, auth: false }),
  list: (params = "") => apiRequest(`/contact${params}`),
};

export const dashboardApi = {
  overview: () => apiRequest("/dashboard/overview"),
};
