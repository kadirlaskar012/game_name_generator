import { describe, it, expect } from 'vitest';
import { generateRequestSchema, searchQuerySchema, trackEventSchema } from '../src/lib/validation/schemas';

describe('Zod Validation Schemas', () => {
  it('validates valid generation request payload', () => {
    const valid = generateRequestSchema.safeParse({
      name: 'Kadir',
      gameSlug: 'free-fire',
      gender: 'boy',
      symbols: true,
      count: 20,
    });
    expect(valid.success).toBe(true);
  });

  it('rejects excessively long names or counts exceeding 50', () => {
    const invalid = generateRequestSchema.safeParse({
      name: 'a'.repeat(60),
      count: 100,
    });
    expect(invalid.success).toBe(false);
  });

  it('validates search query string', () => {
    const valid = searchQuerySchema.safeParse({ q: 'free fire' });
    expect(valid.success).toBe(true);

    const empty = searchQuerySchema.safeParse({ q: '' });
    expect(empty.success).toBe(false);
  });

  it('validates track event payloads', () => {
    const valid = trackEventSchema.safeParse({
      name: '亗Kᴀᴅɪʀ亗',
      action: 'copy',
    });
    expect(valid.success).toBe(true);
  });
});
