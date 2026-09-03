function safeNextPath(value, fallback) {
  if (typeof value !== "string") return fallback;
  const next = value.trim();
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  if (next.includes("\\") || next.includes("://")) return fallback;
  if (!/^\/[A-Za-z0-9/_?#.\-~%&=]*$/.test(next)) return fallback;
  return next;
}

module.exports = { safeNextPath };
