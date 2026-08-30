import { describe, it, expect } from 'vitest';
import { normalizeForSafety, validateContentSafety } from '../src/lib/generator/safety';

describe('Profanity and Safety Filter Engine', () => {
  it('normalizes decomposed Unicode accents', () => {
    const input = 'Füçk';
    const norm = normalizeForSafety(input);
    expect(norm).toBe('fuck');
  });

  it('normalizes leetspeak numbers and special characters', () => {
    const input = 'b!tch';
    const norm = normalizeForSafety(input);
    expect(norm).toBe('bitch');

    const input2 = 'f4gg0t';
    const norm2 = normalizeForSafety(input2);
    expect(norm2).toBe('faggot');
  });

  it('strips zero-width invisible characters designed to bypass filters', () => {
    const input = 'f\u200Bu\u200Bc\u200Bk';
    const norm = normalizeForSafety(input);
    expect(norm).toBe('fuck');
  });

  it('correctly flags prohibited offensive terms', async () => {
    const check1 = await validateContentSafety('b!tch_killer');
    expect(check1.isSafe).toBe(false);
    expect(check1.flaggedWord).toBe('bitch');

    const check2 = await validateContentSafety('Kadir_Warrior');
    expect(check2.isSafe).toBe(true);
  });
});
