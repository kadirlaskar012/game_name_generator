import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../src/lib/security/ratelimit';

describe('Sliding Window Rate Limiter', () => {
  it('allows requests within limit quota', () => {
    const ip = `test_ip_${Date.now()}`;
    const r1 = checkRateLimit(ip, 5);
    expect(r1.isAllowed).toBe(true);
    expect(r1.remaining).toBe(4);

    const r2 = checkRateLimit(ip, 5);
    expect(r2.isAllowed).toBe(true);
    expect(r2.remaining).toBe(3);
  });

  it('blocks requests exceeding configured threshold', () => {
    const ip = `test_blocked_${Date.now()}`;
    for (let i = 0; i < 3; i++) {
      checkRateLimit(ip, 3);
    }
    const exceeded = checkRateLimit(ip, 3);
    expect(exceeded.isAllowed).toBe(false);
    expect(exceeded.remaining).toBe(0);
    expect(exceeded.resetSeconds).toBeGreaterThan(0);
  });
});
