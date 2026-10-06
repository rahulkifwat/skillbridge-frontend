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
  login: (email, password, academy) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: { email, password, ...(academy ? { academy } : {}) },
      auth: false,
    }),
  register: (payload) =>
    apiRequest("/auth/register", { method: "POST", body: payload, auth: false }),
  me: () => apiRequest("/auth/me"),
  logout: () => apiRequest("/auth/logout", { method: "POST" }),
  oauthProviders: () => apiRequest("/auth/oauth/providers", { auth: false }),
  oauthStartUrl: (provider, query = "") => {
    const base = `${API_URL}/auth/oauth/${encodeURIComponent(provider)}`;
    return query ? `${base}?${query}` : base;
  },
};

export const contactApi = {
  submit: (payload) =>
    apiRequest("/contact", { method: "POST", body: payload, auth: false }),
  list: (params = "") => apiRequest(`/contact${params}`),
};

export const dashboardApi = {
  overview: () => apiRequest("/dashboard/overview"),
};

export const spanishApi = {
  billing: () => apiRequest("/spanish/billing"),
  checkout: (product, returnTo) =>
    apiRequest("/spanish/billing/checkout", { method: "POST", body: { product, returnTo } }),
  confirmCheckout: (sessionId) =>
    apiRequest(`/spanish/billing/confirm?sessionId=${encodeURIComponent(sessionId)}`),
  start: (payload) => apiRequest("/spanish/assessment/start", { method: "POST", body: payload }),
  section: (attemptId, skill) => apiRequest(`/spanish/assessment/${attemptId}/section/${skill}`),
  saveAnswers: (attemptId, answers, artifacts) =>
    apiRequest(`/spanish/assessment/${attemptId}/answers`, { method: "POST", body: { answers, artifacts } }),
  review: (attemptId) => apiRequest(`/spanish/assessment/${attemptId}/review`),
  submit: (attemptId) => apiRequest(`/spanish/assessment/${attemptId}/submit`, { method: "POST" }),
  profile: () => apiRequest("/spanish/profile"),
  learning: () => apiRequest("/spanish/learning"),
  credentials: () => apiRequest("/spanish/credentials"),
  programs: () => apiRequest("/v1/spanish/programs"),
  lawUnit1: () => apiRequest("/v1/spanish/programs/law/units/1"),
  lawUnit1Lesson: (lessonId) =>
    apiRequest(`/v1/spanish/programs/law/units/1/lessons/${encodeURIComponent(lessonId)}`),
  lawUnit1Forms: () => apiRequest("/v1/spanish/programs/law/units/1/forms"),
  saveLawUnit1Form: (payload) =>
    apiRequest("/v1/spanish/programs/law/units/1/forms", { method: "POST", body: payload }),
  videos: () => apiRequest("/spanish/videos"),
  videoProgress: (videoId, payload) =>
    apiRequest(`/spanish/videos/${encodeURIComponent(videoId)}/progress`, { method: "POST", body: payload }),
  masterSimulations: (query = "") => apiRequest(`/v1/simulations${query}`),
  startMasterSimulation: (simulationId) =>
    apiRequest(`/v1/simulations/${encodeURIComponent(simulationId)}/start`, { method: "POST", body: {} }),
  generateLayout: (simulationId, previousVariationId) =>
    apiRequest("/v1/ai/layout", {
      method: "POST",
      body: { simulationId, previousVariationId },
    }),
  respondMasterSimulation: (sessionId, content, extra = {}) =>
    apiRequest(`/v1/simulation-sessions/${encodeURIComponent(sessionId)}/responses`, {
      method: "POST",
      body: { response_type: extra.response_type || "text", content },
    }),
  completeMasterSimulation: (sessionId) =>
    apiRequest(`/v1/simulation-sessions/${encodeURIComponent(sessionId)}/complete`, { method: "POST", body: {} }),
  retryMasterSimulation: (sessionId) =>
    apiRequest(`/v1/simulation-sessions/${encodeURIComponent(sessionId)}/retry`, { method: "POST", body: {} }),
  masterSimulationHistory: () => apiRequest("/v1/simulation-history"),
  teacherStudents: () => apiRequest("/v1/teacher/students"),
  teacherStudentResults: (id) => apiRequest(`/v1/teacher/students/${encodeURIComponent(id)}/simulation-results`),
  teacherAnalytics: () => apiRequest("/v1/teacher/analytics"),
  assignSimulation: (payload) =>
    apiRequest("/v1/teacher/assignments", { method: "POST", body: payload }),
  simulations: () => apiRequest("/spanish/simulations"),
  startSimulation: (scenarioId) =>
    apiRequest("/spanish/simulations/start", { method: "POST", body: { scenarioId } }),
  chooseSimulation: (runId, optionId) =>
    apiRequest(`/spanish/simulations/${runId}/choose`, { method: "POST", body: { optionId } }),
};

// Production Master Blueprint modules — SBS-2026-PRODUCTION-002.
export const blueprintApi = {
  modules: () => apiRequest("/blueprint/modules"),
  module: (lessonId) => apiRequest(`/blueprint/modules/${encodeURIComponent(lessonId)}`),
  startSession: (lessonId) =>
    apiRequest(`/blueprint/modules/${encodeURIComponent(lessonId)}/sessions`, {
      method: "POST",
      body: {},
    }),
  session: (sessionId) => apiRequest(`/blueprint/sessions/${encodeURIComponent(sessionId)}`),
  videoPosition: (sessionId, positionSec) =>
    apiRequest(`/blueprint/sessions/${encodeURIComponent(sessionId)}/video-position`, {
      method: "POST",
      body: { positionSec },
    }),
  submitStage: (sessionId, stageId, payload) =>
    apiRequest(
      `/blueprint/sessions/${encodeURIComponent(sessionId)}/stages/${encodeURIComponent(stageId)}`,
      { method: "POST", body: payload }
    ),
  review: (sessionId) =>
    apiRequest(`/blueprint/sessions/${encodeURIComponent(sessionId)}/review`, {
      method: "POST",
      body: {},
    }),
  lmsExport: (sessionId) =>
    apiRequest(`/blueprint/sessions/${encodeURIComponent(sessionId)}/lms-export`),
};
