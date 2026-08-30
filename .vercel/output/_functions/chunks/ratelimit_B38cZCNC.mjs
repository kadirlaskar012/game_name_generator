const rateLimitStore = /* @__PURE__ */ new Map();
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 6e4);
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(ip);
    }
  }
}, 3e5);
function checkRateLimit(identifier, limitPerMinute = 60, windowMs = 6e4) {
  const now = Date.now();
  const record = rateLimitStore.get(identifier) || { timestamps: [] };
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
  if (record.timestamps.length >= limitPerMinute) {
    const oldestTimestamp = record.timestamps[0];
    const resetSeconds2 = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1e3));
    return {
      isAllowed: false,
      limit: limitPerMinute,
      remaining: 0,
      resetSeconds: resetSeconds2
    };
  }
  record.timestamps.push(now);
  rateLimitStore.set(identifier, record);
  const remaining = Math.max(0, limitPerMinute - record.timestamps.length);
  const resetSeconds = Math.ceil(windowMs / 1e3);
  return {
    isAllowed: true,
    limit: limitPerMinute,
    remaining,
    resetSeconds
  };
}
function getClientIp(request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export { checkRateLimit as c, getClientIp as g };
