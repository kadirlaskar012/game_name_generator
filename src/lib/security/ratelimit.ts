interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 60000);
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(ip);
    }
  }
}, 300000);

export interface RateLimitResult {
  isAllowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Sliding window in-memory rate limiter for API endpoints.
 */
export function checkRateLimit(
  identifier: string,
  limitPerMinute = 60,
  windowMs = 60000
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier) || { timestamps: [] };

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limitPerMinute) {
    const oldestTimestamp = record.timestamps[0];
    const resetSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));

    return {
      isAllowed: false,
      limit: limitPerMinute,
      remaining: 0,
      resetSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);
  rateLimitStore.set(identifier, record);

  const remaining = Math.max(0, limitPerMinute - record.timestamps.length);
  const resetSeconds = Math.ceil(windowMs / 1000);

  return {
    isAllowed: true,
    limit: limitPerMinute,
    remaining,
    resetSeconds,
  };
}

/**
 * Extracts client IP from request headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}
